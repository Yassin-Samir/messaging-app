import { useState, useContext, useCallback, memo, useRef } from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext } from "../../App";
import Picker from "@emoji-mart/react";
import EmojiData from "@emoji-mart/data";
import imgInput from "../../assets/image-solid.svg";
import useReader from "../../hooks/useReader";
import { storage } from "../../firebase/firebase";
import smileEmoji from "../../assets/smile-solid.svg";
import XIcon from "../../assets/icons8-x-50.png";
function Form({ messagesRef, setOptimisticMessages }) {
  const [message, setMessage] = useState("");
  const [ShowEmojiPicker, setShowEmojiPicker] = useState(false);
  const reader = useReader();
  const [Img, setImg] = useState(null);
  const fileInputRef = useRef(null);
  const auth = useContext(AuthContext);
  const handleInputChange = useCallback(
    (e) => {
      if (!e.target.files.length) {
        alert("no files were selected");
        setImg(null);
        return;
      }
      const file = e.target.files[0];
      setImg(reader(file));
      if (!Img) return;
      URL.revokeObjectURL(Img.url);
    },
    [Img]
  );
  const handleOpenEmojiPicker = () => setShowEmojiPicker((prev) => !prev);
  const cleanImg = () =>
    setImg((prev) => {
      console.log({ prev });
      URL.revokeObjectURL(prev.url);
      return null;
    });
  const sendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      closeEmojiPicker();
      try {
        let downloadUrl = "";
        const optimisticMessage = {
          docId: crypto.randomUUID(),
          Loading: true,
          type: Img && !Img.sent ? "Image" : "text",
          value: Img && !Img.sent ? Img.url : message,
          uid: auth.currentUser.uid,
          createdAt: serverTimestamp(),
          photoURL: auth.currentUser.photoURL,
        };
        Img && !Img.sent ? (optimisticMessage.ImageName = Img.name) : null;
        setOptimisticMessages((prev) => [...prev, optimisticMessage]);
        if (message) setMessage("");
        if (Img) {
          try {
            setImg((prev) => ({ ...prev, sent: true }));
            const storageRef = ref(storage, `/files/${Img.blob.name}`);
            const uploadTask = uploadBytesResumable(storageRef, Img.blob);
            downloadUrl = await getDownloadURL((await uploadTask).ref);
          } catch (error) {
            console.log({ error });
            cleanImg();
            alert("failed to upload file");
            return;
          }
        }
        const messageDocument = {
          type: Img && !Img.sent ? "Image" : "text",
          value: Img && !Img.sent ? downloadUrl : message,
          uid: auth.currentUser.uid,
          createdAt: serverTimestamp(),
          photoURL: auth.currentUser.photoURL,
        };
        Img && !Img.sent ? (messageDocument.ImageName = Img.name) : null;
        const addDocument = await addDoc(messagesRef, messageDocument);
      } catch (error) {
        console.log({ error });
        alert("failed to send your message please try again");
      } finally {
        Img && cleanImg();
      }
    },
    [message, auth, Img]
  );
  const handleEmojiClick = (emoji) =>
    setMessage((prevMessage) => prevMessage + emoji.native);
  const closeEmojiPicker = () =>
    ShowEmojiPicker ? setShowEmojiPicker(false) : null;
  const handleChange = ({ target: { value } }) => setMessage(value);
  const handleImgChange = () => fileInputRef.current.click();
  return (
    <>
      {ShowEmojiPicker && (
        <Picker data={EmojiData} onEmojiSelect={handleEmojiClick} />
      )}
      <form onSubmit={sendMessage}>
        {Img && !Img.sent ? (
          <div>
            <img src={Img.url} alt="Selected Image" className="displayImg" />
            <button type="button" onClick={cleanImg}>
              <img src={XIcon} alt="XIcon" className="xIcon" />
            </button>
          </div>
        ) : null}

        <input
          type="text"
          value={message}
          placeholder="Write a message"
          disabled={Img ? !Img.sent : false}
          onChange={handleChange}
          onClick={closeEmojiPicker}
        />
        <button
          type="button"
          disabled={message}
          className="imgInput"
          onClick={handleImgChange}
        >
          <img src={imgInput} alt="Image Svg" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          style={{ display: "none" }}
        />
        <button
          type="button"
          style={{ padding: "0" }}
          disabled={Img ? !Img.sent : false}
          onClick={handleOpenEmojiPicker}
        >
          <img src={smileEmoji} alt="Smile Icon" />
        </button>
        <button
          disabled={Img ? Img.sent : !Img && !message.replace(/\s+/, "")}
          type="submit"
        >
          send
        </button>
      </form>
    </>
  );
}
export default memo(Form);

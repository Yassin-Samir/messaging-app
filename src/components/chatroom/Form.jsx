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
function Form({ messagesRef }) {
  const [message, setMessage] = useState("");
  const [Loading, setLoading] = useState(null);
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
  const handleOpenEmojiPicker = useCallback(
    () => setShowEmojiPicker((prev) => !prev),
    []
  );
  const cleanImg = useCallback(
    () =>
      setImg((prev) => {
        URL.revokeObjectURL(prev.url);
        return null;
      }),
    []
  );
  const sendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        let downloadUrl = "";
        if (Img) {
          try {
            const storageRef = ref(storage, `/files/${Img.blob.name}`);
            const uploadTask = uploadBytesResumable(storageRef, Img.blob);
            uploadTask.on("state_changed", (snapshot) =>
              setLoading(snapshot.bytesTransferred / snapshot.totalBytes || 0.1)
            );
            downloadUrl = await getDownloadURL((await uploadTask).ref);
          } catch (error) {
            console.log({ error });
            alert("failed to upload file");
          }
        }
        setLoading((prev) => (prev !== null ? prev : true));
        addDoc(messagesRef, {
          type: Img ? "Image" : "text",
          value: Img ? downloadUrl : message,
          uid: auth.currentUser.uid,
          createdAt: serverTimestamp(),
          photoURL: auth.currentUser.photoURL,
        });
      } catch (error) {
        alert("failed to send your message please try again");
      } finally {
        setLoading(null);
        if (message) {
          setMessage("");
          return;
        }
        cleanImg();
      }
    },
    [message, auth, Img]
  );
  const handleEmojiClick = useCallback(
    (emoji) => {
      const newMessage = message + emoji.native;
      setMessage(newMessage);
    },
    [message]
  );
  const handleChange = useCallback(
    ({ target: { value } }) => setMessage(value),
    []
  );
  const handleImgChange = useCallback(() => fileInputRef.current.click(), []);
  return (
    <>
      {ShowEmojiPicker && (
        <Picker data={EmojiData} onEmojiSelect={handleEmojiClick} />
      )}
      <form onSubmit={sendMessage}>
        {Img ? (
          <div>
            <img
              src={Img.url}
              style={{ opacity: Loading === null ? 0.1 : Loading }}
              alt="Selected Image"
              className="displayImg"
            />
            <button
              type="button"
              disabled={Loading !== 0 && Loading !== null}
              onClick={cleanImg}
            >
              <img src={XIcon} alt="XIcon" className="xIcon" />
            </button>
          </div>
        ) : null}
        <input
          type="text"
          value={message}
          placeholder="Write a message"
          disabled={Img}
          onChange={handleChange}
          onClick={() => (ShowEmojiPicker ? setShowEmojiPicker(false) : null)}
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
          disabled={Img}
          onClick={handleOpenEmojiPicker}
        >
          <img src={smileEmoji} alt="Smile Icon" />
        </button>
        <button
          disabled={
            Loading !== 0 && Loading !== null
              ? true
              : !message.replace(/\s+/, "") && !Img
          }
          type="submit"
        >
          send
        </button>
      </form>
    </>
  );
}
export default memo(Form);

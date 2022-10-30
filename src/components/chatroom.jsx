import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
  getFirestore,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState, useRef } from "react";
function Chatroom() {
  const auth = getAuth();
  const firestore = getFirestore();
  const messagesRef = collection(firestore, "messages");
  const messageQuery = query(messagesRef, orderBy("createdAt"));
  const [messages] = useCollectionData(messageQuery);
  const [value, setValue] = useState("");
  const ref = useRef();
  const sendMessage = (e) => {
    e.preventDefault();
    ref.current.scrollIntoView({ behavior: "smooth" });
    addDoc(messagesRef, {
      text: value,
      uid: auth.currentUser.uid,
      createdAt: serverTimestamp(),
      photoURL: auth.currentUser.photoURL,
    });
    setValue("");
  };
  const ChatMessage = ({ text, id, photoURL }) => {
    return (
      <div
        className={`message ${
          id == auth.currentUser.uid ? "sent" : "received"
        }`}
      >
        <img src={photoURL} loading="lazy" />
        <p>{text}</p>
      </div>
    );
  };
  return (
    <>
      <main>
        {messages &&
          messages.map((i, ind) => (
            <ChatMessage
              text={i.text}
              id={i.uid}
              key={ind + 1}
              photoURL={i.photoURL}
            />
          ))}
        <span ref={ref} className="scroll"></span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          disabled={!value}
          type="submit"
          className={`${value ? "click" : "non-click"}`}
        >
          send
        </button>
      </form>
    </>
  );
}

export default Chatroom;

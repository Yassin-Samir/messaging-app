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
const auth = getAuth();
const firestore = getFirestore();
const messagesRef = collection(firestore, "messages");
const messageQuery = query(messagesRef, orderBy("createdAt"));
function Chatroom() {
  const [messages] = useCollectionData(messageQuery);
  const [value, setValue] = useState("");
  const SpanRef = useRef();
  const sendMessage = (e) => {
    e.preventDefault();
    SpanRef.current.scrollIntoView({ behavior: "smooth" });
    addDoc(messagesRef, {
      text: value,
      uid: auth.currentUser.uid,
      createdAt: serverTimestamp(),
      photoURL: auth.currentUser.photoURL,
    });
    setValue("");
  };
  const ChatMessage = ({ text, uid, photoURL }) => {
    return (
      <div
        className={`message ${
          uid === auth.currentUser.uid ? "sent" : "received"
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
          messages.map((i, ind) => <ChatMessage {...i} key={ind + 1} />)}
        <span className="scroll" ref={SpanRef}></span>
      </main>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button disabled={!value} type="submit">
          send
        </button>
      </form>
    </>
  );
}

export default Chatroom;

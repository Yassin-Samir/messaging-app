import "../css/chatroom.css";
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
import { useState, useRef, Suspense } from "react";
const auth = getAuth();
const firestore = getFirestore();
const messagesRef = collection(firestore, "messages");
const messageQuery = query(messagesRef, orderBy("createdAt"));
function Chatroom() {
  const [messages] = useCollectionData(messageQuery);
  const SpanRef = useRef();
  const ChatMessage = ({ text, uid, photoURL }) => {
    return (
      <div
        className={`message ${
          uid === auth.currentUser.uid ? "sent" : "received"
        }`}
      >
        <Suspense fallback={<div className="spinner small"></div>}>
          <img src={photoURL} />
        </Suspense>
        <p>{text}</p>
      </div>
    );
  };
  const Form = () => {
    const [message, setMessage] = useState("");
    const sendMessage = (e) => {
      e.preventDefault();
      SpanRef.current.scrollIntoView({ behaviour: "smooth" });
      addDoc(messagesRef, {
        text: message,
        uid: auth.currentUser.uid,
        createdAt: serverTimestamp(),
        photoURL: auth.currentUser.photoURL,
      });
      setMessage("");
    };
    return (
      <>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button disabled={!message} type="submit">
            send
          </button>
        </form>
      </>
    );
  };
  return (
    <>
      <main>
        {messages &&
          messages.map((i, ind) => <ChatMessage {...i} key={ind + 1} />)}
        <span className="scroll" ref={SpanRef}></span>
      </main>
      <Form />
    </>
  );
}

export default Chatroom;

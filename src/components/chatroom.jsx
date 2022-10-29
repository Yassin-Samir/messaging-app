import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useState, useRef } from "react";
import { firestore } from "../App";
function Chatroom() {
  const auth = getAuth();
  const messagesRef = collection(firestore, "messages");
  const messageQuery = query(messagesRef, orderBy("createdAt"));
  const [messages] = useCollectionData(messageQuery);
  const [value, setValue] = useState("");
  const ref = useRef();
  const sendMessage = (e) => {
    e.preventDefault();
    ref.current.scrollIntoView({ behavior: "smooth" });
    value
      ? addDoc(messagesRef, {
          text: value,
          uid: auth.currentUser.uid,
          createdAt: serverTimestamp(),
          photoURL: auth.currentUser.photoURL,
        })
      : alert("please enter a value");
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
      <header>
        <h1>⚛️🔥💬</h1>
        <button
          class="sign-out"
          onClick={async () => {
            try {
              await signOut(auth);
            } catch {
              alert("no internet connection");
            }
          }}
        >
          Sign Out
        </button>
      </header>
      <section>
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
          <button type="submit" className={`${value ? "click" : "non-click"}`}>
            send
          </button>
        </form>
      </section>
    </>
  );
}

export default Chatroom;

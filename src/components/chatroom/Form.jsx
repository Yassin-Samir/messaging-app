import { useState, useContext } from "react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { Context } from "../../App";
export default function Form({ SpanRef, messagesRef }) {
  const [message, setMessage] = useState("");
  const auth = useContext(Context);
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
          placeholder="Write a message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button disabled={!message} type="submit">
          send
        </button>
      </form>
    </>
  );
}

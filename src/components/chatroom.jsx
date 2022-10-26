import classes from "../css/chatroom.module.css";
import { signOut, getAuth } from "firebase/auth";
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
    const classMessage =
      id === auth.currentUser.uid ? classes.sent : classes.received;
    return (
      <div className={`${classes.message} ${classMessage}`}>
        <img src={photoURL} loading="lazy" />
        <p>{text}</p>
      </div>
    );
  };
  return (
    <div className={classes.Chatroom}>
      <button
        className="sign out"
        onClick={async () => {
          try {
            await signOut(auth);
          } catch {
            alert("no internet connection");
          }
        }}
      >
        SignOut
      </button>
      <div className={classes.chats}>
        {messages &&
          messages.map((i, ind) => (
            <ChatMessage
              text={i.text}
              id={i.uid}
              key={ind + 1}
              photoURL={i.photoURL}
            />
          ))}
        <div className={classes.scrollDiv} ref={ref}>
          test
        </div>
      </div>
      <form onSubmit={sendMessage} className={classes.messageForm}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <input
          type="submit"
          value="send"
          className={value ? classes.ok : classes.not}
        />
      </form>
    </div>
  );
}

export default Chatroom;

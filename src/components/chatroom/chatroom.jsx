import "../../css/chatroom.css";
import { collection, orderBy, query, getFirestore } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useRef } from "react";
import Form from "./Form";
import ChatMessage from "./Chatmessage";
const firestore = getFirestore();
const messagesRef = collection(firestore, "messages");
const messageQuery = query(messagesRef, orderBy("createdAt"));
function Chatroom() {
  const [messages] = useCollectionData(messageQuery);
  const SpanRef = useRef();
  return (
    <>
      <main>
        {messages &&
          messages.map((i, ind) => <ChatMessage {...i} key={ind + 1} />)}
        <span className="scroll" ref={SpanRef}></span>
      </main>
      <Form SpanRef={SpanRef} messagesRef={messagesRef} />
    </>
  );
}

export default Chatroom;

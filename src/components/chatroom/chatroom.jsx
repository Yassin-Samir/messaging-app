import { useRef } from "react";
import {
  collection,
  orderBy,
  query,
  getFirestore,
  limit,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Form from "./Form";
import ChatMessage from "./Chatmessage";
const firestore = getFirestore();
const messagesRef = collection(firestore, "messages");
const messageQuery = query(
  messagesRef,
  limit(15),
  orderBy("createdAt", "desc")
);
function Chatroom() {
  const [messages] = useCollectionData(messageQuery);
  console.log({ messages });
  return (
    <>
      <section>
        {messages &&
          messages.map((i, ind) => <ChatMessage {...i} key={ind + 1} />)}
      </section>
      <Form messagesRef={messagesRef} />
    </>
  );
}

export default Chatroom;

import { collection, orderBy, query, limit } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase/firebase";
import Form from "./Form";
import ChatMessage from "./Chatmessage";
const messagesRef = collection(db, "messages");
const messagesQuery = query(
  messagesRef,
  limit(15),
  orderBy("createdAt", "desc")
);
function Chatroom() {
  const [messages] = useCollectionData(messagesQuery);
  return (
    <>
      <section>
        {messages &&
          messages
            .reverse()
            .map((i, ind) => <ChatMessage {...i} key={ind + 1} />)}
      </section>
      <Form messagesRef={messagesRef} />
    </>
  );
}

export default Chatroom;

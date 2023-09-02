import { collection, orderBy, query, limit } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useCollectionData } from "../../hooks/useCollectionData";
import Form from "./Form";
import ChatMessage from "./Chatmessage";
const messagesRef = collection(db, "messages");
const messagesQuery = query(
  messagesRef,
  limit(15),
  orderBy("createdAt", "desc")
);
function Chatroom() {
  const messages = useCollectionData(messagesQuery);
  return (
    <>
      <section>
        {messages &&
          messages.reverse().map((i) => <ChatMessage {...i} key={i.docId} />)}
      </section>
      <Form messagesRef={messagesRef} />
    </>
  );
}

export default Chatroom;

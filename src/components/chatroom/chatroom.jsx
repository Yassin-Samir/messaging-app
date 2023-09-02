import { collection, orderBy, query, limit } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useCollectionData } from "../../hooks/useCollectionData";
import Form from "./Form";
import ChatMessage from "./Chatmessage";
const messagesRef = collection(db, "messages");
const messagesQuery = query(
  messagesRef,
  /*  limit(15), */
  orderBy("createdAt")
);
function Chatroom() {
  const { optimisticMessages, setOptimisticMessages } =
    useCollectionData(messagesQuery);
  return (
    <>
      <section>
        {optimisticMessages &&
          optimisticMessages.map((i) => (
            <ChatMessage
              {...i}
              key={i.docId}
              optimisticMessages={optimisticMessages}
            />
          ))}
      </section>
      <Form
        messagesRef={messagesRef}
        setOptimisticMessages={setOptimisticMessages}
      />
    </>
  );
}

export default Chatroom;

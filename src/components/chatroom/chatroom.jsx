import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, orderBy, query, limit } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useCollectionData } from "../../hooks/useCollectionData";
import ChatMessage from "./Chatmessage";
import { AuthContext } from "../Layout";
import Form from "./Form";
const messagesRef = collection(db, "messages");
const messagesQuery = query(messagesRef, orderBy("createdAt"));
function Chatroom() {
  const messages = useCollectionData(messagesQuery);
  return (
    <>
      <section>
        {messages &&
          messages.map((i) => (
            <ChatMessage {...i} messages={messages} key={i.docId} />
          ))}
      </section>
      <Form messagesRef={messagesRef} />
    </>
  );
}

export default Chatroom;

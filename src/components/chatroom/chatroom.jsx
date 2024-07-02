import { useEffect, useRef, useState } from "react";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useCollectionData } from "../../hooks/useCollectionData";
import ChatMessage from "./Chatmessage";
import Form from "./Form";
import ProfilePicturesProvider from "../../contexts/ProfilePicturesProvider";
const messagesRef = collection(db, "messages");
const messagesQuery = query(messagesRef, orderBy("createdAt", "desc"));
function Chatroom() {
  const [LoadingMore, setLoadingMore] = useState(true);
  const Limit = useRef(15);
  const messages = useCollectionData(messagesQuery);
  const previewedMessages = messages
    .slice(
      0,
      messages.length > Limit.current ? Limit.current + 1 : messages.length
    )
    .reverse();
  const ScrollIntoRef = useRef();
  useEffect(() => {
    ScrollIntoRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <section>
        {LoadingMore ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="spinner small"></div>
          </div>
        ) : null}

        <ProfilePicturesProvider uids={messages.map(({ uid }) => uid)}>
          {previewedMessages &&
            previewedMessages.map((i, ind) => {
              const IsFirstMessage =
                ind === 0 && messages.length > Limit.current ? true : false;
              return (
                <ChatMessage
                  {...i}
                  messages={messages}
                  isFirstMessage={IsFirstMessage}
                  setLoadingMore={IsFirstMessage ? setLoadingMore : null}
                  Limit={IsFirstMessage ? Limit : null}
                  key={i.docId}
                />
              );
            })}
        </ProfilePicturesProvider>
        <div ref={ScrollIntoRef}></div>
      </section>
      <Form messagesRef={messagesRef} />
    </>
  );
}

export default Chatroom;

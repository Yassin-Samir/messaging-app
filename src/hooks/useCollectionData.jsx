import { useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { useState } from "react";

function useCollectionData(colRef) {
  const [Messages, setMessages] = useState([]);
  useEffect(() => {
    const sub = onSnapshot(colRef, (querySnapshot) => {
      setMessages([]);
      querySnapshot.forEach((doc) => {
        setMessages((prev) => [...prev, { ...doc.data(), docId: doc.id }]);
      });
    });
  }, []);
  return Messages;
}

export { useCollectionData };

import { useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { useState } from "react";

function useCollectionData(colRef) {
  const [Messages, setMessages] = useState([]);
  useEffect(() => {
    const unSub = onSnapshot(colRef, (querySnapshot) => {
      setMessages([]);
      querySnapshot.forEach((doc) => {
        setMessages((prev) => [...prev, { ...doc.data(), docId: doc.id }]);
      });
    });
    return () => unSub();
  }, []);
  return Messages;
}

export { useCollectionData };

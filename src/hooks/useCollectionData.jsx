import { useEffect } from "react";
import { experimental_useOptimistic as UseOptimistic } from "react";
import { onSnapshot } from "firebase/firestore";
import { useState } from "react";

function useCollectionData(colRef) {
  const [Messages, setMessages] = useState([]);
  const [optimisticMessages, setOptimisticMessages] = UseOptimistic(Messages);
  useEffect(() => {
    const unSub = onSnapshot(colRef, (querySnapshot) => {
      setMessages([]);
      querySnapshot.forEach((doc) => {
        setMessages((prev) => [...prev, { ...doc.data(), docId: doc.id }]);
      });
    });
    return unSub;
  }, []);
  return {
    optimisticMessages,
    setOptimisticMessages,
  };
}

export { useCollectionData };

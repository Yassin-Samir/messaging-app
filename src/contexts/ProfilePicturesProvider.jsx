import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { db, storage } from "../firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";
const ProfilePicturesContext = createContext({});
function ProfilePicturesProvider({ children, uids }) {
  const [ProfilePictures, setProfilePictures] = useState({});
  useEffect(() => {
    const nonDuplicateUids = [...new Set(uids)];
    (async () => {
      try {
        const profilePicturesCache = {};
        (
          await Promise.allSettled(
            nonDuplicateUids.map((uid) => {
              return Object.prototype.hasOwnProperty.call(ProfilePictures, uid)
                ? Promise.reject("rejected")
                : getDoc(doc(db, "users", uid));
            })
          )
        ).forEach((result) => {
          if (result.status === "rejected") {
            return;
          }
          if (!result.value.exists()) return;
          const userData = result.value.data();
          profilePicturesCache[result.value.id] = userData.ProfilePicture;
        });
        if (!Object.values(profilePicturesCache).length) return;
        setProfilePictures((prev) => ({ ...prev, ...profilePicturesCache }));
      } catch (error) {
        console.log({ ProfilePicturesProviderError: error });
      }
    })();
  }, [uids]);
  return (
    <ProfilePicturesContext.Provider value={ProfilePictures}>
      {children}
    </ProfilePicturesContext.Provider>
  );
}

export function useProfilePictures() {
  return useContext(ProfilePicturesContext);
}
export default ProfilePicturesProvider;

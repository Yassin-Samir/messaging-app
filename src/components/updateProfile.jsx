import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { db, storage } from "../firebase/firebase";
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { AuthContext } from "./Layout";
import useReader from "../hooks/useReader";
import { doc, updateDoc } from "firebase/firestore";
function UpdateProfile() {
  const { auth } = useContext(AuthContext);
  const { currentUser } = auth;
  const reader = useReader();
  const Navigate = useNavigate();
  const fileInputRef = useRef();
  const [Loading, setLoading] = useState(false);
  const [ProfilePicture, setProfilePicture] = useState({
    url: currentUser?.photoURL || "",
  });
  useEffect(() => () => cleanImg(), []);
  useEffect(() => {
    setProfilePicture({ url: currentUser?.photoURL || "" });
  }, [currentUser]);
  const cleanImg = () => {
    ProfilePicture?.blob && URL.revokeObjectURL(ProfilePicture?.url);
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (ProfilePicture?.url === currentUser?.photoURL) {
      alert("nothing Has Changed");
      return;
    }
    setLoading(true);
    try {
      const storageRef = ref(
        storage,
        `/profilePictures/${auth.currentUser.uid}/${ProfilePicture.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, ProfilePicture.blob);
      const photoURL = await getDownloadURL((await uploadTask).ref);
      await updateProfile(currentUser, {
        displayName: currentUser?.displayName,
        photoURL,
      });
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        ProfilePicture: photoURL,
      });
      Navigate("/chatroom");
    } catch (error) {
      console.log({ error });
      alert("an error has occured");
    } finally {
      cleanImg();
      setLoading(false);
    }
  };
  const handleInputChange = (e) => {
    cleanImg();
    if (!e.target.files.length) {
      alert("no files were selected");
      setProfilePicture({ url: currentUser?.photoURL });
      return;
    }
    const file = e.target.files[0];
    setProfilePicture(reader(file));
  };
  return (
    <form onSubmit={handleUpdateProfile} className="updateProfileForm">
      <button
        type="button"
        className="updateProfilePicture"
        disabled={Loading}
        onClick={() => fileInputRef.current.click()}
      >
        <img src={ProfilePicture?.url} className="updateProfile" />
      </button>
      <p className="displayName">{currentUser?.displayName || ""}</p>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        style={{ display: "none" }}
      />
      <button className="updateProfileBtn" type="submit" disabled={Loading}>
        Update Profile
      </button>
    </form>
  );
}

export default UpdateProfile;

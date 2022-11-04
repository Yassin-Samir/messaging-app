import { signOut, getAuth } from "firebase/auth";
const auth = getAuth();
function Signout() {
  const handleSignout = () => {
    try {
      signOut(auth);
    } catch (error) {
      alert("failed to sign-out");
    }
  };
  return <button onClick={handleSignout}>SignOut</button>;
}
export default Signout;

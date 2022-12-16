import { signOut } from "firebase/auth";
import { AuthContext } from "../App";
import { useContext } from "react";
function Signout() {
  const auth = useContext(AuthContext);
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

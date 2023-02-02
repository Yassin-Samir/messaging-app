import { useContext, useCallback } from "react";
import { signOut } from "firebase/auth";
import { AuthContext } from "../App";
function SignOut() {
  const auth = useContext(AuthContext);
  const handleSignOut = useCallback(() => {
    try {
      signOut(auth);
    } catch (error) {
      alert("failed to sign-out");
    }
  }, [auth?.currentUser?.uid]);
  return <button onClick={handleSignOut}>SignOut</button>;
}
export default SignOut;

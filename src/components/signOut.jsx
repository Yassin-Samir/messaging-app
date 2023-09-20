import { useContext, useCallback } from "react";
import { signOut } from "firebase/auth";
import { AuthContext } from "./Layout";
import { useNavigate } from "react-router-dom";
function SignOut() {
  const { auth } = useContext(AuthContext);
  const handleSignOut = useCallback(async () => {
    try {
      const signOUT = await signOut(auth);
    } catch (error) {
      alert("failed to sign-out");
    }
  }, [auth]);
  return (
    <button className="signBtn" onClick={handleSignOut}>
      SignOut
    </button>
  );
}
export default SignOut;

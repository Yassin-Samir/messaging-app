import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
function SignOut() {
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  return (
    <button
      className="sign-in"
      onClick={async () => {
        try {
          await signInWithPopup(auth, googleProvider);
        } catch {
          alert("no internet connection");
        }
      }}
    >
      SignIn with google
    </button>
  );
}
export default SignOut;

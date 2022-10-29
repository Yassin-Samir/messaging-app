import { getAuth, signOut } from "firebase/auth";
function Signout() {
  const auth = getAuth();
  return (
    auth.currentUser && (
      <button
        onClick={async () => {
          try {
            await signOut(auth);
          } catch (error) {
            await alert("failed to sign-out");
          }
        }}
      >
        SignOut
      </button>
    )
  );
}
export default Signout;

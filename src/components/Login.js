import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/appSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        dispatch(
          login({
            username: user.displayName,
            profilePic: user.photoURL,
            id: user.uid,
          })
        );
      })
      .catch((error) =>
        // Handle Errors here.
        alert(error.message)
      );
  };

  return (
    <div className="grid h-screen items-center bg-[#feff00]">
      <div className="flex flex-col items-center justify-center space-y-2">
        <img
          className="h-[300px] object-contain"
          src="https://scx2.b-cdn.net/gfx/news/2017/1-snapchat.jpg"
          alt=""
        />
        <p>For educational purposes only</p>
        <Button
          className="text-md w-40 transform rounded-lg border-4 border-black bg-[#feff00] font-bold text-black transition duration-200 ease-out hover:scale-110 hover:bg-black hover:text-[#feff00]"
          variant="outlined"
          onClick={signIn}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
}

export default Login;

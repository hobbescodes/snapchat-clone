import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Chats from "./components/Chats";
import ChatView from "./components/ChatView";
import Login from "./components/Login";
import Preview from "./components/Preview";
import WebcamCapture from "./components/WebcamCapture";
import { login, logout, selectUser } from "./features/appSlice";
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <div className="flex h-screen flex-col items-center justify-center bg-[#fefc01]">
          <img
            className="h-[100px] object-contain"
            src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg"
            alt=""
          />
          <p>For educational purposes only</p>
          <div className="relative flex h-[520px] w-[270px] items-center justify-center rounded-[40px] bg-black">
            <div className="absolute top-6 left-[100px] h-4 w-4 rounded-full bg-[#fefc01]"></div>
            <div className="absolute top-7 right-24 h-2 w-12 rounded-full bg-[#fefc01]"></div>
            <div className="absolute bottom-4 right-[120px] h-8 w-8 rounded-full bg-[#fefc01]"></div>
            <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<WebcamCapture />} />
                <Route path="/preview" element={<Preview />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="/chats/view" element={<ChatView />} />
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      )}
    </>
  );
}

export default App;

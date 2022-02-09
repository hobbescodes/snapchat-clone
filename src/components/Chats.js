import { Avatar } from "@material-ui/core";
import { ChatBubble, Search } from "@mui/icons-material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import Chat from "./Chat";
import { RadioButtonUnchecked } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { resetCameraImage } from "../features/cameraSlice";
import { selectUser } from "../features/appSlice";

function Chats() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const unsubcribe = onSnapshot(
      query(collection(db, "posts"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setPosts(snapshot.docs);
      }
    );

    return () => {
      unsubcribe();
    };
  }, [db]);

  const takeSnap = () => {
    dispatch(resetCameraImage());
    navigate("/", { replace: true });
  };

  return (
    <div className="relative h-[400px] w-[250px]">
      <div className="flex h-[50px] items-center justify-between bg-[#059ee0] px-[10px]">
        <Avatar
          src={user.profilePic}
          onClick={() => auth.signOut()}
          className="h-[25px] w-[25px] cursor-pointer"
        />
        <div className="flex flex-1 items-center space-x-1 pl-2">
          <Search className="text-[13px] text-white" />
          <input
            className="flex-1 border-0 bg-transparent text-[12px] text-white outline-0 placeholder:text-white placeholder:opacity-100"
            placeholder="Friends"
            type="text"
          />
        </div>
        <ChatBubble className="text-[18px] text-white" />
      </div>

      <div className="shadow-chats scrollbar-hide -mt-[4px] h-[354px] overflow-scroll rounded-t-[10px] bg-white">
        {posts.map((post) => (
          <Chat
            key={post.id}
            id={post.id}
            username={post.data().username}
            timestamp={post.data().timestamp}
            imageUrl={post.data().image}
            read={post.data().read}
            profilePic={user.profilePic}
          />
        ))}
      </div>

      <RadioButtonUnchecked
        className="absolute bottom-[20px] left-[107px] cursor-pointer text-black hover:text-gray-500"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
}

export default Chats;

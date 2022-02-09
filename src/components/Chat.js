import { StopRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactTimeago from "react-timeago";
import { selectImage } from "../features/appSlice";
import { db } from "../firebase";

function Chat({ id, username, timestamp, read, imageUrl, profilePic }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = async () => {
    if (!read) {
      dispatch(selectImage(imageUrl));
      await setDoc(
        doc(db, "posts", id),
        {
          read: true,
        },
        { merge: true }
      );

      navigate("/chats/view", { replace: true });
    }
  };
  return (
    <div
      onClick={open}
      className="flex cursor-pointer items-center justify-between border-b-[1px] border-gray-200 p-2 hover:opacity-80"
    >
      <Avatar src={profilePic} className="mx-1 h-[35px] w-[35px]" />
      <div className="flex-1 pl-2">
        <h4 className="text-[11px] font-medium">{username}</h4>
        <p className="text-[9px]">
          {!read && "Tap to view -"}{" "}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>
      {!read && <StopRounded className="text-[#ed3b55]" />}
    </div>
  );
}

export default Chat;

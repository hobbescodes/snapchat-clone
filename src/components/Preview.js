import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCameraImage, selectCameraImage } from "../features/cameraSlice";
import {
  Close,
  TextFields,
  Create,
  Note,
  MusicNote,
  AttachFile,
  Crop,
  Timer,
  Send,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import { v4 as uuid } from "uuid";
import { selectUser } from "../features/appSlice";

function Preview() {
  const cameraImage = useSelector(selectCameraImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!cameraImage) {
      navigate("/", { replace: true });
    }
  }, [cameraImage, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage());
  };

  const sendPost = async () => {
    const id = uuid();

    // Create a post and add to firestore 'posts' collection
    // Get the post ID for the newly created post
    // Upload the image to firebase storage with the post ID
    // Get a download URL from firebase storage and update the original post with image

    const docRef = await addDoc(collection(db, "posts"), {
      id: id,
      timestamp: serverTimestamp(),
    });

    console.log("New doc added with ID", docRef.id);

    const imageRef = ref(storage, `posts/${docRef.id}`);

    await uploadString(imageRef, cameraImage, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
          username: user.username,
          read: false,
          //profilePic: user.profilePic,
        });
      },
      navigate("/chats", { replace: true })
    );
  };

  return (
    <div className="relative">
      <Close
        onClick={closePreview}
        className="absolute top-0 m-[5px] cursor-pointer text-white"
      />
      <div className="absolute right-0 m-[5px] flex flex-col space-y-2 text-white">
        <TextFields className="toolbarBtn" />
        <Create className="toolbarBtn" />
        <Note className="toolbarBtn" />
        <MusicNote className="toolbarBtn" />
        <AttachFile className="toolbarBtn" />
        <Crop className="toolbarBtn" />
        <Timer className="toolbarBtn" />
      </div>
      <img src={cameraImage} alt="preview" />
      <div
        onClick={sendPost}
        className="absolute bottom-2 right-2 flex cursor-pointer items-center justify-evenly space-x-1 rounded-[30px] bg-yellow-300 p-[7px] text-black"
      >
        <h2 className="text-sm">Send Now</h2>
        <Send className="text-[14px]" />
      </div>
    </div>
  );
}

export default Preview;

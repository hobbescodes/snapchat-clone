import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { RadioButtonUnchecked } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCameraImage } from "../features/cameraSlice";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

function WebcamCapture() {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    navigate("/preview", { replace: true });
  }, [webcamRef]);

  return (
    <div className="relative">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />
      <RadioButtonUnchecked
        className="absolute bottom-[20px] left-[107px] cursor-pointer text-white"
        onClick={capture}
        fontSize="large"
      />
    </div>
  );
}

export default WebcamCapture;

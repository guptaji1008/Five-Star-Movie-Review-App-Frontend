import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { uploadMovie, uploadTrailer } from "../../api/movie";
import MovieForm from "./MovieForm";
import ModalContainer from "../modals/ModalContainer";

export default function MovieUpload({ visible, onClose, toast }) {
  
  const [videoSelected, setVideSelected] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [videoInfo, setVideoInfo] = useState({});
  const [busy, setBusy] = useState(false)

  const handleUploadTrailer = async (data) => {
    const { error, url, public_id } = await uploadTrailer(
      data,
      setUploadProgress
    );

    if (error) return toast.error(error);

    setVideoUploaded(true);
    setVideoInfo({ url, public_id });
  };

  const handleChange = (file) => {
    const formData = new FormData();
    formData.append("video", file);

    setVideSelected(true);
    handleUploadTrailer(formData);
  };

  const handleTypeError = (error) => {
    toast.error(error);
  };

  const handleUploadedVideoMessage = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return "Processing";
    }
    return `Uploaded video ${uploadProgress}%`;
  };

  const handleSubmit = async (movieInfo) => {
    if (!videoInfo.url || !videoInfo.public_id)
      return toast.error("Trailer is missing!");

    setBusy(true)
    movieInfo.append("trailer", JSON.stringify(videoInfo));
    const { error, movie } = await uploadMovie(movieInfo);
    setBusy(false)
    if (error) return toast.error(error)
    setVideSelected(false)
    toast.success("Movie Uploaded Successfully!")
    onClose()
  };

  // return null
  return (
    <>
      <ModalContainer visible={visible}>
        <VideoUploadProgress
          visible={!videoUploaded && videoSelected}
          width={uploadProgress}
          message={handleUploadedVideoMessage()}
        />
        {!videoSelected ? (
          <TrailerUpload
            visible={!videoSelected}
            handleChange={handleChange}
            onTypeError={handleTypeError}
          />
        ) : (
          <MovieForm toast={toast} btnTitle="Upload" onSubmit={!busy ? handleSubmit : null} busy={busy} />
        )}
      </ModalContainer>
    </>
  );
}

const TrailerUpload = ({ visible, handleChange, onTypeError }) => {
  if (!visible) return null;

  return (
    <div className="h-full flex items-center justify-center">
      <FileUploader
        handleChange={handleChange}
        onTypeError={onTypeError}
        types={["mp4", "avi"]}
      >
        <div className="w-48 h-48 border border-dashed dark:border-dark-subtle border-light-subtle rounded-full flex flex-col items-center justify-center dark:text-white text-secondary cursor-pointer">
          <AiOutlineCloudUpload size={80} />
          <p>Drop your file here!</p>
        </div>
      </FileUploader>
    </div>
  );
};

const VideoUploadProgress = ({ visible, width, message }) => {
  if (!visible) return null;

  return (
    <div className="dark:bg-secondary bg-dark-subtle drop-shadow-lg rounded p-3">
      <div className="relative h-3 dark:bg-dark-subtle rounded-full bg-light-subtle overflow-hidden">
        <div
          style={{ width: `${width}%` }}
          className="h-full absolute left-0 rounded-r-full dark:bg-white bg-secondary"
        />
      </div>
      <p className="font-semibold dark:text-gray-200 text-secondary animate-pulse mt-2">
        {message}
      </p>
    </div>
  );
};

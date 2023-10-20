import React, { useEffect, useState } from "react";
import { commonInputClasses } from "../../utils/theme";
import PosterSelector from "../PosterSelector";
import Selector from "../Selector";
import { ImSpinner } from "react-icons/im";

const defaultActorInfo = {
  name: "",
  about: "",
  avatar: null,
  gender: "",
};

const genderOptions = [
  { title: "Male", value: "male" },
  { title: "Female", value: "female" },
  { title: "Other", value: "other" },
];

export default function ActorForm({ title, btnTitle, onSubmit, loading, initialState, toast }) {
  const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo });

  const [selectedAvatarForUI, setSelectedAvatarForUI] = useState("");

  const updatePosterForUI = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedAvatarForUI(url);
  };

  const handleChange = ({ target }) => {
    const { value, files, name } = target;
    if (name === "avatar") {
      const file = files[0];
      updatePosterForUI(file);
      return setActorInfo({ ...actorInfo, avatar: file });
    }
    setActorInfo({ ...actorInfo, [name]: value });
  };

  const validateActor = ({ name, about, gender, avatar }) => {
    if(!name.trim()) return { error : "Name is missing!"}
    if(!about.trim()) return { error : "About section is empty!"}
    if(!gender.trim()) return { error : "Gender is missing!"}
    if(avatar && !avatar.type?.startsWith('image')) return { error : "Invalis image/avatar file!"}

    return { error: null }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateActor(actorInfo)
    if (error) return toast.error(error)

    //submit form :

    const formData = new FormData()
    for (let key in actorInfo) {
      if (key) formData.append(key, actorInfo[key])
    }

    onSubmit(formData)
  };

  useEffect(() => {
    if (initialState) {
    setActorInfo({...initialState, avatar: null})
    setSelectedAvatarForUI(initialState.avatar?.url)
    }
  }, [initialState])

  const { name, about, gender } = actorInfo;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-3 dark:bg-gray-700 bg-white p-3 rounded w-[35rem]"
      >
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl dark:text-white text-primary">
            {title}
          </h1>
          <button
            className="px-3 py-1 bg-primary text-white dark:bg-white dark:text-primary hover:opacity-80 transition rounded"
            type="submit"
          >
            {!loading ? btnTitle : <ImSpinner size={20} className='animate-spin mx-6 my-1'/>}
          </button>
        </div>
        <div className="flex space-x-2">
          <div className="flex flex-col space-y-2">
            <PosterSelector
            name="avatar"
            onChange={handleChange}
            selectedPoster={selectedAvatarForUI}
            label="Select Avatar"
            accept="image/jpg, image/jpeg, image/png"
            className="w-44 h-40 aspect-square object-cover cursor-pointer"
          />
            <Selector
              options={genderOptions}
              label="Gender"
              value={gender}
              name="gender"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-grow flex-col space-y-2">

            <input
              placeholder="Name.."
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              className={commonInputClasses + " border-2 p-2"}
            />
            <textarea
              placeholder="About.."
              name="about"
              value={about}
              onChange={handleChange}
              className={
                commonInputClasses + " border-2 resize-none h-full p-2"
              }
            ></textarea>
          </div>
        </div>
      </form>
    </>
  );
}

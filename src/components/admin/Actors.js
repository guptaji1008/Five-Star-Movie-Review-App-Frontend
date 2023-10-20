import React, { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { deleteActor, getActors, searchActor } from "../../api/actor";
import NextAndPrevButton from "../NextAndPrevButton";
import UpdateActor from "../modals/UpdateActor";
import AppSearchForm from "../form/AppSearchForm";
import { useSearch } from "../../hooks";
import ConfirmModal from "../modals/ConfirmModal";

let currentPageNo = 0;
const limit = 12;
export default function Actors({toast}) {
  const { handleSearch, resetSearch, resultNotFound } = useSearch();

  const [actors, setActors] = useState([]);
  const [result, setResult] = useState([]);
  const [reachedToend, setReachedToEnd] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [busy, setBusy] = useState(false)

  const fetchActors = async (pageNo) => {
    const { profiles, error } = await getActors(pageNo, limit);
    if (error) return toast.error(error);

    if (!profiles.length) {
      currentPageNo -= 1;
      return setReachedToEnd(true);
    }
    setActors([...profiles]);
  };

  useEffect(() => {
    fetchActors(currentPageNo);
  }, []);

  const handleNextButton = () => {
    if (reachedToend) return;
    currentPageNo += 1;
    fetchActors(currentPageNo);
  };

  const handlPrevButton = () => {
    if (reachedToend) setReachedToEnd(false);
    if (currentPageNo <= 0) {
      currentPageNo = 0;
      return;
    }
    currentPageNo -= 1;
    fetchActors(currentPageNo);
  };

  const handleOnEditClick = (profile) => {
    setShowUpdateModal(true);
    setSelectedProfile(profile);
  };

  const hideUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleOnDeleteClick = (profile) => {
    setShowConfirmModal(true);
    setSelectedProfile(profile)
  };

  const handleOnUpdateProfile = (profile) => {
    const updatedActors = actors.map((actor) => {
      if (actor.id === profile.id) {
        return profile;
      }
      return actor;
    });
    setActors([...updatedActors]);
  };

  const handleOnSearchSubmit = (value) => {
    handleSearch(searchActor, value, setResult);
  };

  const handleOnReset = () => {
    resetSearch();
    setResult([]);
  };

  const handleOnDeleteConfirm = async () => {
    setBusy(true)
    const { message, error } = await deleteActor(selectedProfile.id)
    if (error) return toast.error(error)

    setBusy(false)
    toast.success(message)
    setShowConfirmModal(false)
    fetchActors(currentPageNo)
  }

  return (
    <>
      <div className="flex justify-end mb-5 mr-10">
        <AppSearchForm
          placeholder="Search Actor.."
          onSubmit={handleOnSearchSubmit}
          showResetButton={result.length || resultNotFound}
          onReset={handleOnReset}
        />
      </div>
      {resultNotFound ? (
        <p className="text-3xl font-semibold dark:text-gray-200 text-gray-900 text-center">
          Result not found 🙁
        </p>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-x-7 gap-y-7">
            {result.length
              ? result.map((actor) => (
                  <ActorProfile
                    onDeleteClick={() => handleOnDeleteClick(actor)}
                    onEditClick={() => handleOnEditClick(actor)}
                    profile={actor}
                    key={actor.id}
                  />
                ))
              : actors.map((actor) => (
                  <ActorProfile
                    onDeleteClick={() => handleOnDeleteClick(actor)}
                    onEditClick={() => handleOnEditClick(actor)}
                    profile={actor}
                    key={actor.id}
                  />
                ))}
          </div>
          {!result.length ? (
            <NextAndPrevButton
              className="mt-5"
              onNextClick={handleNextButton}
              onPrevClick={handlPrevButton}
            />
          ) : null}

          <ConfirmModal
            visible={showConfirmModal}
            busy={busy}
            title="Are you sure?"
            subTitle="This action will remove this profile permanently!"
            onCancel={() => setShowConfirmModal(false)}
            onConfirm={handleOnDeleteConfirm}
          />

          <UpdateActor
            visible={showUpdateModal}
            onClose={hideUpdateModal}
            initialState={selectedProfile}
            onSuccess={handleOnUpdateProfile}
            toast={toast}
          />
        </div>
      )}
    </>
  );
}

const ActorProfile = ({ profile, onEditClick, onDeleteClick }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  if (!profile) return null;

  const { name, avatar, about = "" } = profile;

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="bg-gray-200 shadow dark:bg-gray-800 rounded h-20 overflow-hidden relative cursor-pointer transition"
    >
      <div className="flex">
        <img className="w-20 aspect-square" src={avatar?.url} alt={name} />

        <div className="dark:text-white text-primary mx-5">
          <p className="text-xl font-semibold">{name}</p>
          <p className="opacity-60">{about.substring(0, 50) + " ..."}</p>
        </div>
        <Options
          visible={showOptions}
          onDeleteClick={onDeleteClick}
          onEditClick={onEditClick}
        />
      </div>
    </div>
  );
};

const Options = ({ visible, onDeleteClick, onEditClick }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 flex items-center bg-primary bg-opacity-25 backdrop-blur-sm justify-center space-x-14">
      <button
        className="dark:text-white text-primary text-xl hover:animate-bounce"
        type="button"
        onClick={onDeleteClick}
      >
        <BsTrash />
      </button>
      <button
        className="dark:text-white text-primary text-xl hover:animate-bounce"
        type="button"
        onClick={onEditClick}
      >
        <BsPencilSquare />
      </button>
    </div>
  );
};

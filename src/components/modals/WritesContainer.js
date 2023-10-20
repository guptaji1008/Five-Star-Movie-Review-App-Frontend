import React from "react";
import ModalContainer from "./ModalContainer";
import { AiOutlineClose } from "react-icons/ai";

export default function WritesContainer({ visible, profiles = [], onClose, onRemoveClick }) {
  return (
    <ModalContainer ignoreContainer={true} onClose={onClose} visible={visible}>
      <div className="dark:bg-gray-700 bg-white rounded w-[22rem] max-h-[20rem] overflow-auto custom-scroll-bar p-2 space-y-2">
        {profiles.map(({ id, name, avatar }) => {
          return (
            <div
              key={id}
              className="flex relative space-x-2 hover:dark:bg-light-subtle hover:bg-dark-subtle transition"
            >
              <img className="w-16 h-16 aspect-square object-cover rounded" src={avatar ? avatar?.url : null} alt={name} />
              <p className="font-semibold w-full dark:text-white text-primary">
                {name}
              </p>
              <button onClick={() => onRemoveClick(id)} className="absolute top-1 right-1">
                <AiOutlineClose />
              </button>
            </div>
          );
        })}
      </div>
    </ModalContainer>
  );
}

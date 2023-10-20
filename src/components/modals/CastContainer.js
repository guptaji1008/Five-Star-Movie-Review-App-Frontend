import React from "react";
import ModalContainer from "./ModalContainer";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

export default function CastContainer({
  visible,
  casts = [],
  onClose,
  onRemoveClick,
}) {
  return (
    <ModalContainer ignoreContainer={true} onClose={onClose} visible={visible}>
      <div className="dark:bg-gray-700 bg-white rounded w-[22rem] max-h-[20rem] overflow-auto custom-scroll-bar p-2 space-y-2">
        {casts.map(({ profile, roleAs, leadActor }) => {
          const { id, name, avatar } = profile;
          return (
            <div
              key={id}
              className="flex relative space-x-2 hover:dark:bg-light-subtle hover:bg-gray-400 transition"
            >
              <img
                className="w-16 h-16 aspect-square object-cover rounded"
                src={avatar ? avatar?.url: null}
                alt={name}
              />
              <div className="w-full flex">
                <div className="flex flex-col space-y-2">
                  <div className="w-full flex items-center space-x-2">
                    <p className="font-semibold dark:text-white text-primary">
                      {name}
                    </p>
                    {leadActor && (
                      <div className="w-4 h-4 p-1 flex items-center justify-center rounded bg-green-600">
                        <AiOutlineCheck className="text-white font-bold h-full w-full" />
                      </div>
                    )}
                  </div>
                  <p className="font-semibold w-full dark:text-white text-primary">
                    Role As : {roleAs}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onRemoveClick(id)}
                className="absolute top-1 right-1"
              >
                <AiOutlineClose />
              </button>
            </div>
          );
        })}
      </div>
    </ModalContainer>
  );
}

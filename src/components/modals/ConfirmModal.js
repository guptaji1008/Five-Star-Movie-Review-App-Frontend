import React from "react";
import ModalContainer from "./ModalContainer";
import { MdDeleteOutline } from "react-icons/md";
import { ImSpinner9 } from "react-icons/im";

export default function ConfirmModal({
  visible,
  busy,
  onCancel,
  onConfirm,
  title,
  subTitle,
}) {
  const commonClasses = "px-3 py-1 rounded";

  return (
    <ModalContainer visible={visible} ignoreContainer={true}>
      <div className="dark:bg-gray-700 bg-white rounded p-4">
        <p className="text-red-400 font-semibold text-xl">{title}</p>
        <p className="text-secondary dark:text-white text-sm">{subTitle}</p>
        <div className="flex items-center space-x-3 justify-end mt-3">
          <button
            type="button"
            className={
              commonClasses +
              " text-white flex items-center bg-red-400 space-x-1"
            }
            onClick={onConfirm}
          >
            <span className="font-semibold">
              {!busy ? (
                "Delete"
              ) : (
                <ImSpinner9 size={18} className="mx-7 my-1 animate-spin" />
              )}
            </span>
            {!busy ? <MdDeleteOutline size={20} /> : null}
          </button>
          <button
            disabled={busy}
            type="button"
            className={commonClasses + " border-2 dark:text-white text-primary"}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalContainer>
  );
}

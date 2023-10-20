import React from "react";
import ModalContainer from "./ModalContainer";
import RatingStar from "../RatingStar";
import { BiSolidCommentEdit } from "react-icons/bi";
import { AiTwotoneDelete } from "react-icons/ai";

export default function MyReviewModal({ visible, onClose, review, onEditClick, onDeleteClick }) {
  return (
    <div>
      <ModalContainer
        visible={visible}
        onClose={onClose}
        ignoreContainer={true}
      >
        <div className="p-5 w-1/2 dark:bg-gray-800 bg-white drop-shadow-lg flex items-center justify-between rounded">
          <div className="space-y-2 w-3/4">
            <div className="flex items-center space-x-2">
              <p className="dark:text-white text-primary font-bold">Rating </p>
              <RatingStar rating={review.rating} />
            </div>
            <div className="flex space-x-3">
              <p className="dark:text-white text-primary font-bold">Content </p>
              <p className="dark:text-white text-primary">
                {review.content ? (
                  review.content
                ) : (
                  <span className="opacity-40 font-sans">
                    --You have not comment--
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="dark:text-white text-primary"
              title="Edit"
              onClick={onEditClick}
            >
              <BiSolidCommentEdit size={24} />
            </button>
            <button
              type="button"
              className="dark:text-white text-primary"
              title="Delete"
              onClick={onDeleteClick}
            >
              <AiTwotoneDelete size={24} />
            </button>
          </div>
        </div>
      </ModalContainer>
    </div>
  );
}

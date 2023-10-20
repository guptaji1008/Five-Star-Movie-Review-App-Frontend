import React from "react";

export default function ModalContainer({
  children,
  ignoreContainer,
  visible,
  onClose,
}) {
  const handleClick = (e) => {
    if (e.target.id === "modal-container") onClose && onClose();
  };

  const renderChildren = () => {
    if (ignoreContainer) return children;

    return (
      <div className="dark:bg-gray-700 bg-white rounded w-[45rem] h-[38rem] overflow-auto custom-scroll-bar p-2 space-y-2">
        {children}
      </div>
    );
  };

  if (!visible) return null;

  return (
    <div
      onClick={handleClick}
      id="modal-container"
      className="fixed inset-0 bg-primary bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
    >
      {renderChildren()}
    </div>
  );
}

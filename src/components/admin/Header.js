import React, { useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useTheme } from "../../hooks";
import { BsFillSunFill } from "react-icons/bs";
import AppSearchForm from "../form/AppSearchForm";
import { useNavigate } from "react-router-dom";

export default function Header({onAddMovieClick, onAddActorClick}) {
  const { toggleTheme } = useTheme();

  const navigate = useNavigate()

  const [showOptions, setShowOptions] = useState(false);

  const handleSearchSubmit = (query) => {
    if (!query.trim()) return;

    navigate(`/search?title=${query}`)
  }

  const handleReset = () => {
    navigate('/')
  }

  const options = [{title: "Add Movie", onClick: onAddMovieClick}, {title: "Add Actor", onClick: onAddActorClick}]

  return (
    <div className="mb-5 flex items-center justify-between max-w-screen-xl relative">
      <div>
        <AppSearchForm onReset={handleReset} onSubmit={handleSearchSubmit} placeholder="Search Movie.." />
      </div>

      <div className="mr-10 flex items-center space-x-4">
        <button onClick={toggleTheme} className="bg-transparent p-1 rounded">
          <BsFillSunFill className="dark:text-white text-primary" size={24} />
        </button>
        <button
          className="flex items-center space-x-2 dark:border-white dark:hover:border-dark-subtle border-secondary hover:border-primary
      dark:text-white text-primary hover:opacity-80 transition font-semibold border-2 rounded text-lg px-3 py-1"
          onClick={() => setShowOptions(true)}
        >
          <span>Create</span>
          <AiOutlinePlus />
        </button>
      </div>
      <CreateOptions
        visible={showOptions}
        onClose={() => setShowOptions(false)}
        options={options}
      />
    </div>
  );
}

const CreateOptions = ({ visible, onClose, options }) => {
  const container = useRef();

  const containerID = "option-container";

  useEffect(() => {
    const handleClose = (e) => {
      if (!visible) return;
      const { parentElement, id } = e.target;
      if (parentElement.id === containerID || id === containerID) return;

      if (container.current) {
        if (!container.current.classList.contains("animate-scale"))
          container.current.classList.add("animate-scale-reverse");
      }
    };

    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, [visible]);

  const handleClick = (func) => {
    func()
    onClose()
  }

  if (!visible) return null;

  return (
    <div
      ref={container}
      id={containerID}
      className="absolute z-50 right-9 top-12 flex flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg rounded animate-scale"
      onAnimationEnd={(e) => {
        if (e.target.classList.contains("animate-scale-reverse")) {
          onClose();
        }
        e.target.classList.remove("animate-scale");
      }}
    >
      {
        options.map(({title, onClick}, index) => {
          return <Option key={index} onClick={() => handleClick(onClick)}>{title}</Option>
        })
      }
    </div>
  );
};

const Option = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="dark:text-white text-secondary hover:opacity-80 transition"
    >
      {children}
    </button>
  );
};

import React, { useEffect, useState } from "react";
import ModalContainer from "./ModalContainer";
import { genres } from "../../utils/genres";
import Submit from "../form/Submit";

export default function GenresContainer({ visible, onClose, onSubmit, previousSelection }) {

    const [selectedGenres, setSelectedGenre] = useState([])

    const handleGenreSelector = (gen) => {
        let newGenres = []

        if (selectedGenres.includes(gen)) {
            newGenres = selectedGenres.filter(genre => genre !== gen)
        }
        else newGenres = [ ...selectedGenres, gen ]

        setSelectedGenre([...newGenres])
    }

    const handleSubmit = () => {
        onSubmit(selectedGenres)
        onClose()
    }

    const handleClose = () => {
        setSelectedGenre(previousSelection)
        onClose()
    }

    useEffect(() => {
        setSelectedGenre(previousSelection)
    }, [])

  return (
    <ModalContainer visible={visible} onClose={handleClose} ignoreContainer={true}>
      <div className="dark:bg-gray-700 bg-white rounded w-[40rem] max-h-[38rem] overflow-auto custom-scroll-bar py-4 px-2 space-y-2">
        <p className="dark:text-white text-primary text-2xl font font-semibold text-center">
          Select Genres
        </p>

        <div className="space-y-3">
          {genres.map((gen) => {
            return <Genre 
            onClick={() => handleGenreSelector(gen)}
            key={gen}
            selected={selectedGenres.includes(gen)}
            >{gen}</Genre>;
          })}
        </div>
        <Submit value="Submit" type="button" onClick={handleSubmit} />
      </div>
    </ModalContainer>
  );
}

const Genre = ({ children, selected, onClick }) => {

    const getSelectedStyle = () => {
        return selected ? "bg-green-700 text-white font-semibold" : ""
    }

  return (
    <button 
    onClick={onClick}
    className={getSelectedStyle() + " border-2 dark:border-dark-subtle border-light-subtle dark:text-white text-primary px-2 py-1 rounded mx-1"}
    >
      {children}
    </button>
  );
};

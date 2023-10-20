import React, { useEffect, useState } from "react";
import TagsInput from "../TagsInput";
import { commonInputClasses } from "../../utils/theme";
import Submit from "../form/Submit";
import WritesContainer from "../modals/WritesContainer";
import CastForm from "../form/CastForm";
import CastContainer from "../modals/CastContainer";
import PosterSelector from "../PosterSelector";
import GenresSelector from "../GenresSelector";
import GenresContainer from "../modals/GenresContainer";
import Selector from "../Selector";
import {
  languageOptions,
  statusOptions,
  typeOptions,
} from "../../utils/options";
import { Label, LabelWithBadge, ViewAllBtn } from "../Label";
import DirectorSelector from "../DirectorSelector";
import WritersSelector from "../WritersSelector";
import { validateMovie } from "../../utils/validator";

const defaultMovieInfo = {
  title: "",
  storyLine: "",
  tags: [],
  cast: [],
  director: {},
  writers: [],
  releaseDate: "",
  poster: null,
  genres: [],
  type: "",
  language: "",
  status: "",
};

export default function MovieForm({ toast, btnTitle, onSubmit, busy, initialState }) {
  const [movieInfo, setMovieInfo] = useState({ ...defaultMovieInfo });
  const [showWriterModal, setShowWriterModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);
  const [showGenresModal, setShowGenresModal] = useState(false);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState("");

  const updatePosterForUI = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedPosterForUI(url);
  };

  const handleOnChange = ({ target }) => {
    const { value, name, files } = target;

    if (name === "poster") {
      const poster = files[0];
      updatePosterForUI(poster);
      console.log(selectedPosterForUI);
      return setMovieInfo({ ...movieInfo, poster });
    }

    setMovieInfo({ ...movieInfo, [name]: value });
  };

  const updateTags = (tags) => {
    setMovieInfo({ ...movieInfo, tags });
  };

  const updateDirector = (profile) => {
    setMovieInfo({ ...movieInfo, director: profile });
  };

  const updateWriters = (profile) => {
    const { writers } = movieInfo;
    for (let writer of writers) {
      if (writer.id === profile.id)
        return toast.error("The profile is already selected");
    }
    setMovieInfo({ ...movieInfo, writers: [...writers, profile] });
  };

  const updateCast = (castInfo) => {
    const { cast } = movieInfo;
    setMovieInfo({ ...movieInfo, cast: [...cast, castInfo] });
  };

  const updateGenres = (genres) => {
    setMovieInfo({ ...movieInfo, genres });
  };

  const handlWriterRemove = (profileId) => {
    const { writers } = movieInfo;
    const newWriters = writers.filter(({ id }) => id !== profileId);
    if (newWriters.length === 0) setShowWriterModal(false);
    setMovieInfo({ ...movieInfo, writers: newWriters });
  };

  const handlCastRemove = (profileId) => {
    const { cast } = movieInfo;
    const newCast = cast.filter(({ profile }) => profile.id !== profileId);
    if (newCast.length === 0) setShowCastModal(false);
    setMovieInfo({ ...movieInfo, cast: newCast });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = validateMovie(movieInfo);
    if (error) return toast.error(error);

    // cast, tags, genres, writers :
    const { tags, genres, cast, director, writers, poster } = movieInfo;
    const formData = new FormData();

    const finalMovieInfo = {
      ...movieInfo,
    };

    finalMovieInfo.tags = JSON.stringify(tags);
    finalMovieInfo.genres = JSON.stringify(genres);

    const finalCast = cast.map((c) => ({
      actor: c.profile.id,
      roleAs: c.roleAs,
      leadActor: c.leadActor,
    }));
    finalMovieInfo.cast = JSON.stringify(finalCast);
    if (writers.length) {
      const finalWriters = writers.map((w) => w.id);
      finalMovieInfo.writers = JSON.stringify(finalWriters);
    }
    if (director.id) {
      finalMovieInfo.director = director.id;
    }
    if (poster) finalMovieInfo.poster = poster;

    for (let key in finalMovieInfo) {
      formData.append(key, finalMovieInfo[key]);
    }

    await onSubmit(formData);
  };

  useEffect(() => {
    if (initialState) {
      setMovieInfo({
        ...initialState,
        releaseDate: initialState.releaseDate.split("T")[0],
        poster: null,
      });
      setSelectedPosterForUI(initialState?.poster.url);
    }
  }, [initialState]);

  const {
    title,
    storyLine,
    writers,
    cast,
    releaseDate,
    genres,
    type,
    language,
    status,
    tags
  } = movieInfo;

  return (
    <div>
      <div className="flex space-x-3">
        <div className="w-[70%] space-y-5">
          <div>
            <Label htmlFor="title">Title : </Label>
            <input
              id="title"
              type="text"
              name="title"
              value={title}
              onChange={handleOnChange}
              className={commonInputClasses + " border-2 text-xl p-1"}
              placeholder="Titanic"
            />
          </div>
          <div>
            <Label htmlFor="storyline">Story line : </Label>
            <textarea
              value={storyLine}
              onChange={handleOnChange}
              name="storyLine"
              placeholder="Story line.."
              className={
                commonInputClasses +
                " resize-none border-2 h-24 p-1 custom-scroll-bar"
              }
              id="storyline"
            ></textarea>
          </div>
          <div>
            <Label htmlFor="tags">Tags</Label>
            <TagsInput value={tags} name="tags" onChange={updateTags} />
          </div>

          <DirectorSelector onSelect={updateDirector} />

          <WritersSelector
            onSelect={updateWriters}
            writers={writers}
            setShowWriterModal={setShowWriterModal}
          />

          <div>
            <div className="flex items-center justify-between">
              <LabelWithBadge
                className={`top-1 left-[10.5rem]`}
                badge={cast.length <= 9 ? cast.length : "9+"}
              >
                Add Cast & Crew :
              </LabelWithBadge>
              <ViewAllBtn
                visible={cast.length}
                onClick={() =>
                  cast.length !== 0
                    ? setShowCastModal(true)
                    : setShowCastModal(false)
                }
              >
                View All
              </ViewAllBtn>
            </div>
            <CastForm onSubmit={updateCast} toast={toast} />
          </div>

          <div>
            <input
              className={commonInputClasses + " border-2 rounded p-1 w-fit"}
              type="date"
              name="releaseDate"
              value={releaseDate}
              onChange={handleOnChange}
            />
          </div>

          <Submit
            value={btnTitle}
            type="button"
            onClick={handleSubmit}
            busy={busy}
          />
        </div>
        <div className="w-[30%] space-y-5">
          <PosterSelector
            name="poster"
            onChange={handleOnChange}
            selectedPoster={selectedPosterForUI}
            accept="image/jpg, image/jpeg, image/png"
            label="Select Poster"
          />
          <GenresSelector
            badge={genres.length}
            onClick={() => setShowGenresModal(true)}
          />
          <Selector
            onChange={handleOnChange}
            name="type"
            value={type}
            label="type"
            options={typeOptions}
          />
          <Selector
            onChange={handleOnChange}
            name="language"
            value={language}
            label="language"
            options={languageOptions}
          />
          <Selector
            onChange={handleOnChange}
            name="status"
            value={status}
            label="status"
            options={statusOptions}
          />
        </div>
      </div>
      <WritesContainer
        profiles={writers}
        visible={showWriterModal}
        onClose={() => setShowWriterModal(false)}
        onRemoveClick={handlWriterRemove}
      />
      <CastContainer
        casts={cast}
        visible={showCastModal}
        onClose={() => setShowCastModal(false)}
        onRemoveClick={handlCastRemove}
      />
      <GenresContainer
        visible={showGenresModal}
        onClose={() => setShowGenresModal(false)}
        onSubmit={updateGenres}
        previousSelection={genres}
      />
    </div>
  );
}

import React, { useState } from "react";
import LiveSearch from "../LiveSearch";
import { commonInputClasses } from "../../utils/theme";
import { useSearch } from "../../hooks";
import { searchActor } from "../../api/actor";

// const cast = [{ actor: id, roleAs: "", leadActor: true/false }]

const defaultCast = {
  profile: {},
  roleAs: "",
  leadActor: false,
};

export default function CastForm({ onSubmit, toast }) {
  const [castInfo, setCastInfo] = useState({ ...defaultCast });
  const [profiles, setProfiles] = useState([])
  const { handleSearch, resetSearch } = useSearch()

  const handleOnChange = ({ target }) => {
    const { checked, name, value } = target;

    if (name === "leadActor")
      return setCastInfo({ ...castInfo, leadActor: checked });

    setCastInfo({ ...castInfo, [name]: value });
  };

  const handleProfileSelect = (profile) => {
    setCastInfo({ ...castInfo, profile });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const { profile, roleAs } = castInfo;
    if (!profile.name) return toast.error("Cast profile is missing!");
    if (!roleAs.trim()) return toast.error("Cast role is missing!");

    onSubmit(castInfo);
    setCastInfo({ ...defaultCast, profile: { name: "" } });
    resetSearch()
    setProfiles([])
  };

  const handleProfileChange = ({ target }) => {
    const { value } = target
    const { profile } = castInfo
    profile.name = value
    setCastInfo({ ...castInfo, ...profile })
    handleSearch(searchActor, value, setProfiles)
  }

  const { leadActor, roleAs, profile } = castInfo;

  return (
    <div className="flex flex-col justify-center space-y-1">
      <div className="flex items-center space-x-2">
        <label className="dark:text-white text-primary" htmlFor="check">Lead Actor : </label>
      <input
        className="w-4 h-4"
        id="check"
        type="checkbox"
        name="leadActor"
        checked={leadActor}
        onChange={handleOnChange}
      />
      </div>
      <div className="flex items-center space-x-2">
        <LiveSearch
          placeholder="Search Profile.."
          value={profile.name}
          results={profiles}
          onSelect={handleProfileSelect}
          onChange={handleProfileChange}
          renderItem={(result) => {
            return (
              <div className="flex space-x-2 rounded overflow-hidden">
                <img
                  key={result.id}
                  src={result?.avatar?.url}
                  alt={result.name}
                  className="w-16 h-16 object-cover"
                />
                <p className="dark:text-white font-semibold">{result.name}</p>
              </div>
            );
          }}
        />
        <span className="dark:text-dark-subtle text-light-subtle font-semibold">
          as
        </span>
        <div className="flex-grow">
          <input
            type="text"
            className={commonInputClasses + " rounded p-1 text-lg border-2"}
            placeholder="role as.."
            name="roleAs"
            value={roleAs}
            onChange={handleOnChange}
          />
        </div>
        <button
          onClick={handleSubmit}
          type="button"
          className="bg-secondary text-white px-1 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}

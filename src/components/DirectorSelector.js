import React, { useState } from "react";
import LiveSearch from "./LiveSearch";
import { useSearch } from "../hooks";
import { searchActor } from "../api/actor";
import {Label} from "./Label";

export default function DirectorSelector({onSelect}) {
  const [value, setValue] = useState("");
  const [profiles, setProfiles] = useState([]);

  const { handleSearch, resetSearch } = useSearch()

    const handleOnChange = async ({target}) => {
        const { value } = target
        setValue(value)
        await handleSearch(searchActor, value, setProfiles)
    }

    const handleOnSelect = (profile) => {
        setValue(profile.name)
        onSelect(profile)
        setProfiles([])
        resetSearch()
    }

  return (
    <div>
      <Label htmlFor="director">Director : </Label>
      <LiveSearch
        name="director"
        results={profiles}
        value={value}
        placeholder={`Search Here..`}
        onSelect={handleOnSelect}
        onChange={handleOnChange}
        visible={profiles.length}
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
    </div>
  );
}

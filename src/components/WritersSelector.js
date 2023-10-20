import React, { useState } from "react";
import { LabelWithBadge, ViewAllBtn } from "./Label";
import LiveSearch from "./LiveSearch";
import { useSearch } from "../hooks";
import { searchActor } from "../api/actor";

export default function WritersSelector({onSelect, writers, setShowWriterModal}) {

    const [value, setValue] = useState("");
  const [profiles, setProfiles] = useState([]);

  const { handleSearch, resetSearch } = useSearch()

  const handleOnChange = async ({target}) => {
    const { value } = target
    setValue(value)
    await handleSearch(searchActor, value, setProfiles)
}

const handleOnSelect = (profile) => {
    setValue("")
    onSelect(profile)
    setProfiles([])
    resetSearch()
}

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <LabelWithBadge
          htmlFor="writers"
          badge={writers.length <= 9 ? writers.length : "9+"}
          className={`top-1 left-[5rem]`}
        >
          Writers :
        </LabelWithBadge>
        <ViewAllBtn
          visible={writers.length}
          onClick={() =>
            writers.length !== 0
              ? setShowWriterModal(true)
              : setShowWriterModal(false)
          }
        >
          View All
        </ViewAllBtn>
      </div>
      <LiveSearch
        name="writers"
        results={profiles}
        visible={profiles.length}
        placeholder={`Search Here..`}
        onSelect={handleOnSelect}
        onChange={handleOnChange}
        value={value}
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

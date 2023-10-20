import React from "react";

export default function AppInfoBox({ title, subTitle }) {
  return (
    <div className="bg-gray-200 shadow dark:bg-gray-800 py-2 px-3 rounded">
      <p className="font-semibold text-2xl mb-2 text-primary dark:text-white">
        { title }
      </p>
      <p className="text-xl text-primary dark:text-white">{ subTitle }</p>
    </div>
  );
}

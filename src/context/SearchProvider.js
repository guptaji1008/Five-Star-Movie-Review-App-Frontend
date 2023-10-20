import React, { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SearchContext = createContext();

let timeoutId;
const debounce = (func, delay) => {
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

export default function SearchProvider({ children }) {
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);
  const [error, setError] = useState("");

  const search = async (method, query, updaterFunc) => {
    const { error, results } = await method(query);
    if (error) return toast.error(error);

    if (!results.length) {
      setResults([])
      updaterFunc && updaterFunc([])
      return setResultNotFound(true)
    }
    setResultNotFound(false)
    setResults(results);
    updaterFunc && updaterFunc([...results])
  };

  const resetSearch = () => {
    setSearching(false);
    setResults([]);
    setResultNotFound(false);
  };

  const debounceSearch = debounce(search, 500);

  const handleSearch = (method, query, updaterFunc) => {
    setSearching(true);
    if (!query.trim()) {
      updaterFunc && updaterFunc([])
      return resetSearch();
    }

    debounceSearch(method, query, updaterFunc);
  };

  return (
    <SearchContext.Provider
      value={{ error, searching, resultNotFound, results, handleSearch, resetSearch }}
    >
      {children}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </SearchContext.Provider>
  );
}

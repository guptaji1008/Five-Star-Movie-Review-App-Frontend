import React, { useEffect, useRef, useState } from "react";
import { getLatestUploads } from "../../api/movie";
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

let intervalId;
let count = 0
let newTime = 0
let lastTime = 0
export default function HeroSlideShow({ toast }) {
  const [currentSlide, setCurrentSlide] = useState({});
  const [clonedSlide, setClonedSlide] = useState({});
  const [slides, setSlides] = useState([]);
  const [visible, setVisible] = useState(true)

  const slideRef = useRef();
  const clonedSlideRef = useRef();
  const navigate = useNavigate()

  const fetchLatestUploads = async (signal) => {
    const { error, movies } = await getLatestUploads(signal);
    if (error) return toast.error(error);

    setSlides([...movies]);
    setCurrentSlide(movies[0]);
  };

  const handleOnNextButtonClick = () => {
    lastTime = Date.now()
    pauseSlideShow();
    setClonedSlide(slides[count]);
    count = (count + 1) % slides.length;
    setCurrentSlide(slides[count]);

    clonedSlideRef.current.classList.add("slide-out-to-left");
    slideRef.current.classList.add("slide-in-from-right");
  };

  const handleOnPrevButtonClick = () => {
    pauseSlideShow();
    setClonedSlide(slides[count]);
    count = (count + slides.length - 1) % slides.length;
    setCurrentSlide(slides[count]);

    clonedSlideRef.current.classList.add("slide-out-to-right");
    slideRef.current.classList.add("slide-in-from-left");
  };

  const handleOnAnimationEnd = () => {
    if (slideRef.current.classList.contains("slide-in-from-right")) {
      slideRef.current.classList.remove("slide-in-from-right");
    }
    if (slideRef.current.classList.contains("slide-in-from-left")) {
      slideRef.current.classList.remove("slide-in-from-left");
    }
    if (clonedSlideRef.current.classList.contains("slide-out-to-left")) {
      clonedSlideRef.current.classList.remove("slide-out-to-left");
    }
    if (clonedSlideRef.current.classList.contains("slide-out-to-right")) {
      clonedSlideRef.current.classList.remove("slide-out-to-right");
    }
    setClonedSlide({});
    startSlideShow();
  };

  const startSlideShow = () => {
    intervalId = setInterval(() => {
      newTime = Date.now()
      const delta = newTime - lastTime
      if (delta < 3900) return clearInterval(intervalId)
      handleOnNextButtonClick()
    }, 3500);
  };

  const pauseSlideShow = () => {
    clearInterval(intervalId);
  };

  const handleOnVisibilityChange = () => {
    const visibility = document.visibilityState;
    if (visibility === "hidden") setVisible(false);
    if (visibility === "visible") setVisible(true);
  };

  useEffect(() => {
    const ac = new AbortController()
    fetchLatestUploads(ac.signal);
    document.addEventListener("visibilitychange", handleOnVisibilityChange);

    return () => {
      pauseSlideShow();
      document.removeEventListener(
        "visibilitychange",
        handleOnVisibilityChange
      );
      ac.abort()
    };
  }, []);

  useEffect(() => {
    if (slides.length && visible) {
      startSlideShow();
    } else pauseSlideShow();
  }, [slides.length, visible]);

  const naviagateSingleMovie = (id) => {
    navigate('/movie/' + id)
  }

  return (
    <div className="w-full flex justify-center pt-5 space-x-4">
      {/* Slide Show Section */}
      <div className="lg:w-9/12 w-11/12 aspect-video relative overflow-hidden">
          <img
            onClick={() => naviagateSingleMovie(currentSlide.id)}
            onAnimationEnd={handleOnAnimationEnd}
            ref={slideRef}
            className="aspect-video object-cover cursor-pointer"
            src={currentSlide.poster}
            alt=""
          />
          <img
            onClick={() => naviagateSingleMovie(currentSlide.id)}
            ref={clonedSlideRef}
            className="aspect-video object-cover absolute inset-0 cursor-pointer"
            src={clonedSlide.poster}
            alt=""
          />
        <SlideShowController
          onNextButtonClick={handleOnNextButtonClick}
          onPrevButtonClick={handleOnPrevButtonClick}
        />
      </div>
    </div>
  );
}

const SlideShowController = ({ onPrevButtonClick, onNextButtonClick }) => {
  return (
    <div className="absolute top-1/2 w-full flex items-center justify-between px-5">
      <button type="button" onClick={onPrevButtonClick}>
        <AiOutlineLeftCircle
          className="opacity-30 hover:opacity-80 transition
        "
          size={38}
        />
      </button>
      <button type="button" onClick={onNextButtonClick}>
        <AiOutlineRightCircle
          className="opacity-30 hover:opacity-80 transition"
          size={38}
        />
      </button>
    </div>
  );
};

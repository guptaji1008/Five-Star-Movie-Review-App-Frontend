import React, { useEffect, useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import Submit from "./Submit";

const rating = new Array(10).fill("");
export default function RatingForm({toast, onSubmit, busy, initialReviews}) {
  const [selectedStar, setSelectedStar] = useState([]);
  const [content, setContent] = useState("");

  const handlOnMouseEnter = (index) => {
    const newArr = new Array(index + 1).fill("");
    setSelectedStar([...newArr]);
  };

  const handleSubmit = () => {
    if (!selectedStar.length) return toast.error("Please Rate the Movie!")
    const data = {
        rating: selectedStar.length,
        content
    }
    onSubmit(data)
  }

  useEffect(() => {
    if (initialReviews) {
      const { rating, content } = initialReviews
      const newArr = new Array(rating).fill('')
      setSelectedStar([...newArr])
      setContent(content)
    }
  }, [initialReviews])

  return (
    <div>
      <div className="p-5 dark:bg-primary bg-gray-200 rounded drop-shadow-lg space-y-5">
        <div className="text-yellow-600 flex relative items-center">
          <StarOutlined rating={rating} onMouseEnter={handlOnMouseEnter} />
          <div className="flex items-center absolute top-1/2 -translate-y-1/2">
          <StarFilled selectedStar={selectedStar} onMouseEnter={handlOnMouseEnter} />
          </div>
        </div>
        <textarea
          className="w-full h-24 border-2 p-2 dark:text-white text-primary rounded outline-none bg-transparent resize-none"
          placeholder="Add Comment.."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <Submit busy={busy} onClick={handleSubmit} value="Submit" />
      </div>
    </div>
  );
}

const StarOutlined = ({rating, onMouseEnter}) => {
    return rating.map((_, index) => (
        <AiOutlineStar
          onMouseEnter={() => onMouseEnter(index)}
          className="cursor-pointer"
          key={index}
          size={28}
        />
      ))
}

const StarFilled = ({selectedStar, onMouseEnter}) => {
    return selectedStar.map((_, index) => (
        <AiFillStar
          onMouseEnter={() => onMouseEnter(index)}
          className="cursor-pointer"
          key={index}
          size={28}
        />
      ))
}

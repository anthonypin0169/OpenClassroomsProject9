import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  useEffect(() => {
    if (!byDateDesc || byDateDesc.length === 0) {
      return undefined
    }
    const timer = setTimeout(() => {
      setIndex((prevIndex) => prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0)
    },5000)
    return () => clearTimeout(timer)
  },[index, byDateDesc])

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
      <div
        key={event.id}
        className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
      >
        <img src={event.cover} alt="forum" />

        <div className="SlideCard__descriptionContainer">
          <div className="SlideCard__description">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <div>{getMonth(new Date(event.date))}</div>
          </div>
        </div>
      </div>
      ))}
      {byDateDesc && byDateDesc.length > 0 && (
        <div className="SlideCard__paginationContainer">
          <div className="SlideCard__pagination">
            {byDateDesc.map((currentEvent, radioIdx) => (
              <input
                key={currentEvent.id}
                type="radio"
                name="slider-pagination"
                checked={index === radioIdx}
                onChange={() => {}}
                aria-label={`Slide ${radioIdx + 1} sur ${byDateDesc.length}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Slider;
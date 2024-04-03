import { useState } from "react";
import "./Carousel.css";
import Card from "./Card";

function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);

  const currCard = photos[currCardIdx];
  const total = photos.length;

  // Increments currCardIdx state by 1
  function goForward() {
    if (currCardIdx < total - 1) { // FIX FOR IMAGE ARRAY EXHAUSTION BUG - ensures we don't go before last img
      setCurrCardIdx(currCardIdx + 1);
    }
  }

  // FIX FOR LEFT ARROW BUG - added goBackward, which decrements currCardIdx state by 1
  function goBackward() {
    if (currCardIdx > 0) { // FIX FOR IMAGE ARRAY EXHAUSTION BUG - ensures we don't go before first img
      setCurrCardIdx(currCardIdx - 1);
    }
  }

  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
        {currCardIdx > 0 && (
          <i
            className="bi bi-arrow-left-circle"
            onClick={goBackward} // FIX FOR LEFT ARROW BUG - updated to call goBackward onClick
          />
        )}
        <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        {currCardIdx < total - 1 && (
          <i 
            className="bi bi-arrow-right-circle" // FIX FOR IMAGE ARRAY EXHAUSTION BUG - Conditionally rendering right arrow
            onClick={goForward}
          />
        )}
      </div>
    </div>
  );
}

export default Carousel;
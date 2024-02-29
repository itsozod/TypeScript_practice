import { useRef, useState } from "react";
import styles from "./Card.module.css";

export const Card = () => {
  const cardRef = useRef(null);

  // const handleWheel = () => {
  //   const cardElement = cardRef.current;

  //   if (cardElement) {
  //     cardElement.addEventListener(
  //       "wheel",
  //       (e) => {
  //         e.preventDefault();
  //         cardElement.scrollLeft += e.deltaY;
  //       },
  //       { passive: false }
  //     );
  //   }
  // };

  const [isMouseDown, setMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const handleMouseDown = (e) => {
    setMouseDown(true);
    setStartX(e.pageX - cardRef.current.offsetLeft);
    setScrollLeft(cardRef.current.scrollLeft);
    // console.log("Down", startX);
    // console.log("Down", scrollLeft);
    // console.log("Down", e.pageX);
    // console.log("Down", e.pageX - cardRef.current.offsetLeft);
    // console.log("Down", cardRef.current.offsetLeft);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };
  const handleMouseMove = (e) => {
    if (!isMouseDown) return;
    const { offsetLeft } = cardRef.current;
    const x = e.pageX - offsetLeft;
    // const walk = x - startX;
    cardRef.current.scrollLeft = scrollLeft - (x - startX);
  };
// 
  return (
    <div
      className={styles.cards_container}
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      // onWheel={(e) => {
      //   cardRef.current.scrollLeft = e.deltaY;
      // }}
    >
      <div className={styles.card}>Card</div>
      <div className={styles.card}>Card</div>
      <div className={styles.card}>Card</div>
      <div className={styles.card}>Card</div>
      <div className={styles.card}>Card</div>
      <div className={styles.card}>Card</div>
      <div className={styles.card}>Card</div>
      <div className={styles.card}>Card</div>
    </div>
  );
};

// const [isMouseDown, setMouseDown] = useState(false);
// const [startX, setStartX] = useState(0);
// const [scrollLeft, setScrollLeft] = useState(0);
// const handleMouseDown = (e) => {
//   setMouseDown(true);
//   setStartX(e.pageX - cardRef.current.offsetLeft);
//   setScrollLeft(cardRef.current.scrollLeft);
// };
// const handleMouseLeave = () => {
//   setMouseDown(false);
// };

// const handleMouseUp = () => {
//   setMouseDown(false);
// };
// const handleMouseMove = (e) => {
//   if (!isMouseDown) return;
//   e.preventDefault();
//   const x = e.pageX - cardRef.current.offsetLeft;
//   const walk = (x - startX) * 2;
//   cardRef.current.scrollLeft = scrollLeft - walk;
// };

// const handleWheel = (e) => {
//   e.preventDefault();
//   if (cardRef.current) {
//     // e.preventDefault();
//     cardRef.current.scrollLeft += e.deltaY;
//   } else {
//     cardRef.current.scrollLeft += e.deltaY;
//   }
// };

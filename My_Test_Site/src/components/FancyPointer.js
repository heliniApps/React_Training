import { useState, useEffect } from "react";

const FancyPointer = () => {
  let [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let clientX = 0;
    let clientY = 0;
    let scrollX = 0;
    let scrollY = 0;

    const updatePosition = () => {
      let totalPosX = clientX + scrollX;
      let totalPosY = clientY + scrollY;
      setPosition({ x: totalPosX, y: totalPosY });
    };
    const mousePointerMoveHandler = (event) => {
      clientX = event.clientX;
      clientY = event.clientY;
      updatePosition();
    };
    const pageScrollHandler = (event) => {
      scrollX = window.scrollX;
      scrollY = window.scrollY;
      updatePosition();
    };

    document.addEventListener("pointermove", mousePointerMoveHandler, false);
    document.addEventListener("scroll", pageScrollHandler, false);

    return () => {
      document.removeEventListener(
        "pointermove",
        mousePointerMoveHandler,
        false
      );
      document.removeEventListener("scroll", pageScrollHandler, false);
    };
  }, []);

  // backgroundColor: "turquoise",
  let component = (
    <div
      className="candle-info-pointer"
      style={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        position: "absolute",
        top: -20,
        left: -20,
        backgroundImage: "url(./resources/Mouse_Pointer_img.jpeg)",
        opacity: 0.5,
        pointerEvents: "none",
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    />
  );

  return component;
};

export default FancyPointer;

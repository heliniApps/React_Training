import React from "react";

import CandleType from "./candle-features/CandleType";
import CandleFragrance from "./candle-features/CandleFragrance";
import CurrentStatus from "./CurrentStatus";
import FeedbackForm from "./feedback-form/FeedbackForm";

const Main = () => {
  let mainComponent = (
    <main>
      <div className="main-content main-form-feedback">
        <FeedbackForm />
      </div>
      <div className="main-content main-form-status">
        <CurrentStatus />
      </div>
      <div className="main-content main-candle-info">
        <CandleType />
        <CandleFragrance />
      </div>
    </main>
  );

  return mainComponent;
};

export default Main;

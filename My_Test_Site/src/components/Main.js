import React from "react";

import CandleType from "./CandleType";
import CandleFragrance from "./CandleFragrance";
import CurrentStatus from "./CurrentStatus";
import FeedbackForm from "./FeedbackForm";

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

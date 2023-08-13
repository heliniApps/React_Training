import React from "react";

import CandleFragrance from "./candle-features/CandleFragrance";
import CandleType from "./candle-features/CandleType";
import FeedbackForm from "./feedback-form/FeedbackForm";
import PostComment from "./post-comments/PostComment";
import ControlledComment from "./post-comments/ControlledComment";

const Main = () => {
  let mainComponent = (
    <main>
      <div className="main-content main-controlled-comment">
        <ControlledComment />
      </div>
      <div className="main-content main-form-comment">
        <PostComment />
      </div>
      <div className="main-content main-feedback">
        <FeedbackForm />
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

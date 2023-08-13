import "./FeedbackFormStyles.css";

import { useReducer } from "react";

import NewsletterSubscription from "./NewsletterSubscription";
import EmotionFeedback from "./EmotionFeedback";

const FeedbackMessage = ({ displayText }) => {
  let msgComponent = (
    <div className="feedback-elem feedback-message">
      <label id="customerInput">
        Echo Input: <span>{displayText}</span>
      </label>
      <br />
      <textarea
        id="feedbackText"
        rows="10"
        cols="30"
        placeholder="Enter your feedback.."
      ></textarea>
    </div>
  );

  return msgComponent;
};

const feedbackMessageReducer = (currValue, userInput) => {
  let textAreaElem = document.querySelector("#feedbackText");
  userInput = textAreaElem.value;

  return userInput;
};

const FeedbackForm = () => {
  let defaultDisplayText = "nothing yet";
  /* version 1 */
  const [userInput, setUserInput] = useReducer(
    feedbackMessageReducer,
    defaultDisplayText
  );

  const onSubmitBtnClick = (event) => {
    setUserInput(null);
  };

  let component = (
    <>
      <div className="feedback-emoji">
        <EmotionFeedback />
      </div>

      <div className="feedback-form">
        <FeedbackMessage displayText={userInput} />

        <NewsletterSubscription />

        <div className="feedback-elem feedback-submit-btn">
          <button onClick={onSubmitBtnClick}>Submit Feedback</button>
        </div>
      </div>
    </>
  );

  return component;
};

export default FeedbackForm;

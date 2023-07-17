import { useState, useEffect, useReducer } from "react";

const emojiData = [
  { emoji: "😊", name: "happy face", id: "happy" },
  { emoji: "😐", name: "neutral face", id: "neutral" },
  { emoji: "😡", name: "angry face", id: "angry" },
  { emoji: "🤔", name: "thinking face", id: "thinking" },
  { emoji: "👽", name: "alien", id: "alien" }
];

const FeedbackReply = (props) => {
  let replyComponent = (
    <div className="feedback-elem feedback-reply">
      <label id="replyLabel">
        {props.message}
        <span role="img" aria-label={props.emojiAriaLabel}>
          {props.emotion}
        </span>
      </label>
    </div>
  );
  return replyComponent;
};

const SelectEmotion = (props) => {
  let selectComponent = (
    <div className="feedback-elem feedback-emoji-select">
      <label htmlFor="emotions">How do you feel today: </label>
      <select id="emotions">
        {props.options.map((item) => (
          <option key={item.id} value={item} role="img" aria-label={item.name}>
            {item.emoji}
          </option>
        ))}
      </select>
    </div>
  );

  return selectComponent;
};

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

const getNewsletterSubsText = (isChecked) => {
  if (isChecked === true) {
    return "Subscribed!!";
  } else {
    return "Subscribe to receive monthly newsletter";
  }
};

const subscriptionTextReducer = (currState, checked) => {
  if (checked === null || typeof checked !== "boolean") {
    checked = currState;
  }
  return checked;
};

const NewsletterSubscription = () => {
  const [checked, setChecked] = useReducer(subscriptionTextReducer, false);

  const onSubscriptionChange = (event) => {
    setChecked(event.target.checked);
  };

  let subsComponent = (
    <div className="feedback-elem feedback-subscription">
      <input
        type="checkbox"
        id="subscription"
        value={checked}
        onChange={onSubscriptionChange}
      />
      <label htmlFor="subscription">
        {"  " + getNewsletterSubsText(checked)}
      </label>
    </div>
  );

  return subsComponent;
};

const feedbackMessageReducer = (currState, userInput) => {
  let textAreaElem = document.querySelector("#feedbackText");
  userInput = textAreaElem.value;

  return userInput;
};

const FeedbackForm = () => {
  let replyMessage = "Hello! Nice to see you here... ";
  let replyEmoji = "😊";
  let emojiAriaLabel = "happy face";
  let initDisplayText = "none yet";

  const [displayText, setDisplayText] = useState(initDisplayText);
  const [userInput, setUserInput] = useReducer(feedbackMessageReducer, "");

  useEffect(() => setDisplayText(userInput), [userInput]);

  const onSubmitBtnClick = (event) => {
    setUserInput(userInput);
  };

  let component = (
    <>
      <div className="feedback-emoji">
        <FeedbackReply
          message={replyMessage}
          emotion={replyEmoji}
          emojiAriaLabel={emojiAriaLabel}
        />

        <SelectEmotion options={emojiData} />
      </div>

      <div className="feedback-form">
        <FeedbackMessage displayText={displayText} />

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

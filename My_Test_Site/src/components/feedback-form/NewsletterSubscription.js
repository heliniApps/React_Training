import { useReducer } from "react";

const getNewsletterSubsText = (isChecked) => {
  if (isChecked === true) {
    return "Subscribed!!";
  } else {
    return "Subscribe to receive monthly newsletter";
  }
};

const subscriptionMessageReducer = (currState, checked) => {
  if (checked === null || typeof checked !== "boolean") {
    checked = currState;
  }
  return checked;
};

const NewsletterSubscription = () => {
  const [checked, setChecked] = useReducer(subscriptionMessageReducer, false);

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

export default NewsletterSubscription;

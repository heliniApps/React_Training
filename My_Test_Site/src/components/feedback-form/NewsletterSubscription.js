import { useState, useEffect } from "react";

const getNewsletterSubsText = (isChecked) => {
  if (isChecked === true) {
    return "Subscribed!!";
  } else {
    return "Subscribe to receive monthly newsletter";
  }
};

const NewsletterSubscription = () => {
  const [checked, setChecked] = useState(false);
  let subsMessage = getNewsletterSubsText(checked);

  const handleSubscriptionChange = (event) => {
    let value = event.target.checked;
    if (value !== null && typeof value === "boolean") {
      setChecked(value);
    }
  };

  let subsComponent = (
    <div className="feedback-elem feedback-subscription">
      <input
        type="checkbox"
        id="subscription"
        value={checked}
        onChange={handleSubscriptionChange}
      />
      <label htmlFor="subscription">{" " + subsMessage}</label>
    </div>
  );

  return subsComponent;
};

export default NewsletterSubscription;

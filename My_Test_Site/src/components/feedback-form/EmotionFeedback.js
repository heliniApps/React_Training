import { useState, useEffect, useReducer } from "react";

import { EmojiType, emojiData } from "../../model/data.js";

const findEmojiInfoById = (id) => {
  let emojiObj = emojiData.find((item) => item.id === id);
  return emojiObj;
};

const getReplyMessageByEmojiId = (emojiId) => {
  let message = "";
  switch (emojiId) {
    case EmojiType.Happy:
      message = "Glad to see you are happy! ";
      break;
    case EmojiType.Neutral:
      message = "Why is that... ";
      break;
    case EmojiType.Angry:
      message = "Take a chill pill... ";
      break;
    case EmojiType.Thinking:
      message = "No worries. Take your time... ";
      break;
    case EmojiType.Alien:
      message = "That's quite interesting... ";
      break;
    default:
      message = "Hello! Nice to see you here... ";
      break;
  }
  return message;
};

const ReplyMessage = (props) => {
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

const SelectEmotion = ({ options }) => {
  let selectComponent = (
    <div className="feedback-elem feedback-emoji-select">
      <label htmlFor="emotions">How do you feel today: </label>
      <select id="emotions">
        {options.map((item) => (
          <option
            key={item.id}
            value={item.id}
            role="img"
            aria-label={item.name}
          >
            {item.emoji}
          </option>
        ))}
      </select>
    </div>
  );

  return selectComponent;
};

const addOptionChangeEventListener = (eventHandler) => {
  const emojiSelectElem = document.querySelector("#emotions");
  emojiSelectElem.addEventListener("change", eventHandler, false);

  return () => {
    emojiSelectElem.removeEventListener("change", eventHandler, false);
  };
};

const replyMessageReducer = (currMsg, userInput) => {
  let replyMsgObj = currMsg;
  let newEmojiInfo = findEmojiInfoById(userInput);
  let newMsg = getReplyMessageByEmojiId(userInput);

  if (newEmojiInfo !== null && newMsg !== null) {
    replyMsgObj = {
      message: newMsg,
      emojiInfo: newEmojiInfo
    };
  }

  return replyMsgObj;
};

const EmotionFeedback = () => {
  let defaultEmojiObj = findEmojiInfoById(EmojiType.Happy);
  let defaultReply = {
    message: "Hello! Nice to see you here... ",
    emojiInfo: defaultEmojiObj
  };

  const [replyMsg, setReplyMsg] = useReducer(replyMessageReducer, defaultReply);
  const [userEmotion, setUserEmotion] = useState(defaultEmojiObj.id);

  const onOptionChangeHandler = (event) => {
    setUserEmotion(event.target.value);
  };

  useEffect(() => {
    addOptionChangeEventListener(onOptionChangeHandler);
  }, []);

  useEffect(() => {
    setReplyMsg(userEmotion);
  }, [userEmotion]);

  let component = (
    <>
      <ReplyMessage
        message={replyMsg.message}
        emotion={replyMsg.emojiInfo.emoji}
        emojiAriaLabel={replyMsg.emojiInfo.name}
      />

      <SelectEmotion options={emojiData} />
    </>
  );
  return component;
};

export default EmotionFeedback;

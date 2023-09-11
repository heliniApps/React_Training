import "./MultiComments.css";

import { Editor } from "@tinymce/tinymce-react";
import { useState, useReducer, useEffect, useCallback } from "react";

const isEmptyContent = (editorValue = null) => {
  let contentLength = 0;

  if (editorValue !== null && editorValue.length > 0) {
    contentLength = editorValue
      .split(/&nbsp;/)
      .map((line) => line.trim())
      .filter(
        (line) => line !== "<p>" && line !== "</p>" && line.length > 0
      ).length;
  }
  return contentLength === 0;
};

const isEditorDirty = (editorValue = null) => {
  if (
    editorValue !== undefined &&
    editorValue !== null &&
    editorValue.length > 0
  ) {
    return true;
  }
  return false;
};

/**
 * Component for each individual posted comment.
 * @param {object} props - {id: number, commentValue: "html string"}
 */
const PostedComment = ({ id, commentValue }) => {
  useEffect(() => {
    document.querySelector(`div#id${id}`).innerHTML = commentValue;
  }, [id, commentValue]);

  let component = (
    <>
      <div id={"id" + id} className="comment-border"></div>
      <br />
    </>
  );

  return component;
};

const commentsArrayReducer = (currState, newCommentObj) => {
  let commentsArr = currState;

  if (newCommentObj === null) {
    commentsArr = [];
  } else {
    if (newCommentObj.id !== null && newCommentObj.id !== 0) {
      commentsArr.push(newCommentObj);
    }
  }

  console.log("commentsArr: ", commentsArr);

  return commentsArr;
};

const MultiComments = () => {
  const initialValue = "";

  let [commentValue, setCommentValue] = useState(initialValue);
  let [commentsArr, setCommentsArr] = useReducer(commentsArrayReducer, []);

  // Editor event handlers
  const onEditorChangeHandler = (newComment, editor) => {
    setCommentValue(newComment);
  };

  // Button properties
  let isDisabledCleanEditor = !isEditorDirty(commentValue);
  let isDisabledPostComment = !(
    isEditorDirty(commentValue) && !isEmptyContent(commentValue)
  );

  // Button event handlers
  useEffect(() => {
    const cleanEditorBtn = document.querySelector("button#cleanEditorBtn");
    const onCleanEditorClickHandler = (event) => {
      setCommentValue(initialValue);
    };
    cleanEditorBtn.addEventListener("click", onCleanEditorClickHandler, false);

    return () => {
      cleanEditorBtn.removeEventListener(
        "click",
        onCleanEditorClickHandler,
        false
      );
    };
  }, []);

  useEffect(() => {
    const clearAllBtn = document.querySelector("button#clearBtn");
    const onClearAllCommentsClickHandler = (event) => {
      setCommentsArr(null); // Resets the comments array.
    };
    clearAllBtn.addEventListener(
      "click",
      onClearAllCommentsClickHandler,
      false
    );

    return () => {
      clearAllBtn.removeEventListener(
        "click",
        onClearAllCommentsClickHandler,
        false
      );
    };
  }, []);

  // const onPostCommentClickHandler = (event) => {
  //   const commentObj = {
  //     id: commentsArr.length + 1,
  //     commentValue: commentValue
  //   };
  //   setCommentsArr(commentObj);
  //   setCommentValue(initialValue);
  // };

  const onPostCommentClickHandler = useCallback(
    (event) => {
      console.log("ran onPostCommentClickHandler()");
      const commentObj = {
        id: commentsArr.length + 1,
        commentValue: commentValue,
      };
      setCommentsArr(commentObj);
      setCommentValue(initialValue);
    },
    [commentValue, commentsArr]
  );

  useEffect(() => {
    console.log("running useEffect for PostBtn.");
    const postBtn = document.querySelector("button#postBtn");
    postBtn.addEventListener("click", onPostCommentClickHandler, false);

    return () => {
      postBtn.removeEventListener("click", onPostCommentClickHandler, false);
    };
  }, [onPostCommentClickHandler]);

  const component = (
    <>
      <div className="multi-elem">
        {commentsArr.map((commentObj, index) => (
          <PostedComment
            key={index}
            id={commentObj.id}
            commentValue={commentObj.commentValue}
          />
        ))}
      </div>
      <div className="multi-elem multi-editor">
        <Editor
          apiKey="yu4bgxbc33mg6ljne04etx8qxroxppy8y5c2wnvbz95w7m7z"
          id="multiCommentEditor"
          initialValue={initialValue}
          textareaName="multiCommentEditor"
          value={commentValue}
          onEditorChange={onEditorChangeHandler}
          init={{
            id: "multiCommentEditor",
            height: 200,
            width: 430,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
              "emoticons",
            ],
            toolbar:
              "undo redo | blocks | emoticons | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help ",
          }}
        />
      </div>
      <div className="multi-button">
        <button id="cleanEditorBtn" disabled={isDisabledCleanEditor}>
          Clean Editor
        </button>
        &nbsp;&nbsp;&nbsp;
        <button
          id="postBtn"
          disabled={isDisabledPostComment}
          onClick={onPostCommentClickHandler}
        >
          Post Comment
        </button>
        &nbsp;&nbsp;&nbsp;
        <button id="clearBtn">Clear All Comments</button>
      </div>
    </>
  );

  return component;
};

export default MultiComments;

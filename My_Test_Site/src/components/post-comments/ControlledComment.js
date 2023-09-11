import "./ControlledComment.css";

import { Editor } from "@tinymce/tinymce-react";
import { useState, useEffect } from "react";

const isEditorDirty = (comment) => {
  if (
    comment === null ||
    (typeof comment === "string" && comment.length === 0)
  ) {
    return false;
  }
  return true;
};

const ControlledComment = () => {
  let [commentValue, setCommentValue] = useState("");

  // TinyMCE-Editor event handlers
  const onEditorChangeHandler = (newValue, editor) => setCommentValue(newValue);

  // Post-comment event handler
  const onPostCommentClickHandler = (event) => {
    const postedCommentElem = document.querySelector("div#postedCommentText");
    postedCommentElem.innerHTML = commentValue;
    setCommentValue("");
  };

  useEffect(() => {
    // Button elements
    const cleanEditorBtn = document.querySelector("button#ctrlCleanEditorBtn");
    const clearBtn = document.querySelector("button#ctrlClearBtn");

    // Button-click event handlers
    const onCleanEditorClickHandler = () => {
      setCommentValue("");
    };
    const onClearCommentClickHanlder = () => {
      const postedCommentElem = document.querySelector("div#postedCommentText");
      postedCommentElem.innerHTML = null;
    };

    // Adding event listeners
    cleanEditorBtn.addEventListener("click", onCleanEditorClickHandler, false);
    clearBtn.addEventListener("click", onClearCommentClickHanlder, false);

    return () => {
      cleanEditorBtn.removeEventListener(
        "click",
        onCleanEditorClickHandler,
        false
      );
      clearBtn.removeEventListener("click", onClearCommentClickHanlder, false);
    };
  }, []);

  const component = (
    <>
      <div id="postedCommentText" className="ctrl-elem elem-border"></div>
      <div className="ctrl-elem ctrl-editor">
        <p>Type content below in the inline editor:</p>
        <Editor
          apiKey="yu4bgxbc33mg6ljne04etx8qxroxppy8y5c2wnvbz95w7m7z"
          id="controlledCommentArea"
          initialValue=""
          inline={true}
          tagName="section"
          value={commentValue}
          onEditorChange={onEditorChangeHandler}
          init={{
            id: "controlledCommentArea",
            height: 200,
            width: 400,
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
              "emoticons"
            ],
            toolbar:
              "undo redo | blocks | emoticons | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help "
          }}
        />
      </div>
      <div className="button-elem">
        <button id="ctrlCleanEditorBtn" disabled={!isEditorDirty(commentValue)}>
          Clean Editor
        </button>
        &nbsp;&nbsp;&nbsp;
        <button
          id="ctrlPostBtn"
          disabled={!isEditorDirty(commentValue)}
          onClick={onPostCommentClickHandler}
        >
          Post Comment
        </button>
        &nbsp;&nbsp;&nbsp;
        <button id="ctrlClearBtn">Clear Comment</button>
      </div>
    </>
  );

  return component;
};

export default ControlledComment;

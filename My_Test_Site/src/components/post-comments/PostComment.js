import "./PostComment.css";

import { useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

const PostComment = () => {
  const editorRef = useRef(null);

  const onEditorInitHandler = (event, editor) => {
    editorRef.current = editor;
    editorRef.current.setDirty(false);
  };

  useEffect(() => {
    let paraElem = document.querySelector("div#postedComment");

    const onPostHandler = (event) => {
      let inputValue = editorRef.current.getContent();
      paraElem.innerHTML = inputValue;
      editorRef.current.resetContent();
    };

    const onClearHandler = () => {
      paraElem.textContent = null;
    };

    let postBtn = document.querySelector("button#postBtn");
    let clearBtn = document.querySelector("button#clearBtn");
    postBtn.addEventListener("click", onPostHandler, false);
    clearBtn.addEventListener("click", onClearHandler, false);

    return () => {
      postBtn.removeEventListener("click", onPostHandler, false);
      clearBtn.removeEventListener("click", onClearHandler, false);
    };
  }, []);

  let component = (
    <>
      <div className="comment-elem comment-message">
        <div id="postedComment"></div>
      </div>
      <div className="comment-elem comment-area comment-editor">
        <Editor
          apiKey="yu4bgxbc33mg6ljne04etx8qxroxppy8y5c2wnvbz95w7m7z"
          id="commentText"
          initialValue=""
          textareaName="commentTextArea"
          onInit={onEditorInitHandler}
          init={{
            id: "commentText",
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
      <div className="comment-elem comment-area comment-buttons">
        <button id="postBtn" className="comment-post-btn">
          Post Comment
        </button>
        &nbsp;&nbsp;&nbsp;
        <button id="clearBtn" className="comment-clear-btn">
          Clear Comments
        </button>
      </div>
    </>
  );

  return component;
};

export default PostComment;

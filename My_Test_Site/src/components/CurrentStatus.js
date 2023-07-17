import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

// const onUpdateStatusClickEvent = (event, setCurrentStatus) => {
//   let editorElem = document.querySelector(".tox .tox-edit-area p");
//   console.log(editorElem);
//   // let newStatus = editorElem.textContent;
//   let newStatus = setCurrentStatus(newStatus);

//   // <body id="tinymce" class="mce-content-body " data-id="statusText" aria-label="Rich Text Area. Press ALT-0 for help." contenteditable="true" spellcheck="false" data-new-gr-c-s-check-loaded="14.1115.0" data-gr-ext-installed=""><p><br data-mce-bogus="1"></p></body>
// };

const CurrentStatus = () => {
  let initialStatus = "Happy!";
  const [currentStatus, setCurrentStatus] = useState(initialStatus);

  let editorChangeEvent = null;

  const onInitTinyMceEditor = (evt, editor) => {
    editorChangeEvent = evt;
  };

  const updStatusClickEventHandler = (event) => {
    let newStatus = editorChangeEvent.target.getContent();
    console.log(newStatus);
    // let cleanedStatusText = newStatus.querySelector("p").value;
    // console.log(cleanedStatusText);
    setCurrentStatus(newStatus);
  };

  let statusForm = (
    <div className="status-form">
      <div className="status-message">
        <label>
          I'm feeling <span>{currentStatus}</span>.
        </label>
      </div>

      <div className="status-text-area">
        <Editor
          apiKey="yu4bgxbc33mg6ljne04etx8qxroxppy8y5c2wnvbz95w7m7z"
          initialValue=""
          id="statusText"
          placeholder="Enter current status..."
          onInit={onInitTinyMceEditor}
          init={{
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
      <div className="status-submit-btn">
        <button onClick={updStatusClickEventHandler}>Update Status</button>
      </div>
    </div>
  );

  return statusForm;
};

export default CurrentStatus;

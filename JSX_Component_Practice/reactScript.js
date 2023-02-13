// import React from "react";
// import { useState } from "react";

// const React = require("react");

// ReactDOM.render(
//     React.createElement("h1", null, "Heading using ReactDOM.render()."),
//     document.querySelector("#root")
// );

/* Single element with "text" value/Child. */
let headingElem = React.createElement(
    "h1",
    null,
    "Heading using ReactDOM.render()."
);

let rootElem = document.querySelector("#root");
let firstDiv = document.querySelector("#firstDiv");

ReactDOM.render(headingElem, firstDiv);

/* Element with Multiple Children. */
let emojiListElem = React.createElement(
    "ul",
    { style: { color: "blue", backgroundColor: "red" } },
    React.createElement("li", null, "🤠"),
    React.createElement("li", null, "😜"),
    React.createElement("li", null, "👽")
);
ReactDOM.render(emojiListElem, firstDiv);

/* JSX syntax */

// let basicJSXElem = (
//     <ul style={{ color: "blue", backgroundColor: "yellow" }}>
//         <li>Monday</li>
//         <li>Tuesday</li>
//         <li>Wednesday</li>
//     </ul>
// );

let daysOfWeekObj = {
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
};

let basicJSXElem = (
    <ul style={{ color: "blue", backgroundColor: "yellow" }}>
        <li>{daysOfWeekObj.Monday}</li>
        <li>{daysOfWeekObj.Tuesday}</li>
        <li>{daysOfWeekObj.Wednesday.toUpperCase()}</li>
    </ul>
);
let secondDiv = document.querySelector("#secondDiv");

ReactDOM.render(basicJSXElem, secondDiv);

/* React Components */

function MainComponent() {
    let mainJSX = (
        <main>
            <div className="normalDiv header"></div>
            <div className="normalDiv bodyList"></div>
            <div className="normalDiv useStateTest"></div>
            <div className="normalDiv image-footer"></div>
        </main>
    );
    return mainJSX;
}

ReactDOM.render(<MainComponent />, rootElem);

// Passing Arguments

const staticLovely = "lovely";

function Header1(properties) {
    // extract value using a normal "JavaScript Template Literal".
    /* let headerMsg = `${properties.name}'s {} Kitchen...`;
    return <h1>{headerMsg}</h1>; */
    return (
        <h1>
            {properties.name}'s {staticLovely} Kitchen...
        </h1>
    );
}

function DetailParagraph(properties) {
    //let paraMsg = "We serve the best food around";
    // extract value using JSX Expression
    let paraJSX = (
        <p>
            We serve the {properties.adjective}
            food around ({properties.number}).
        </p>
    );
    return paraJSX;
}

const dishes = ["Mac & Cheese", "Bean Soup", "Fried Rice"];
const dishObjects = dishes.map((dish, index) => ({ id: index, title: dish }));

// passing List of Items
/* function BodyList(props) {
    return (
        <ul>
            {props.dishes.map((dish) => (
                <li>{dish}</li>
            ))}
        </ul>
    );
} */

function BodyList(props) {
    return (
        <ul>
            {props.dishes.map((dish) => (
                <li key={dish.id}>{dish.title}</li>
            ))}
        </ul>
    );
}

// wrapping  Multiple Components
/* function PageHeader() {
    return (
        <div className="pageHeader">
            <Header1 name="Mary" />
            <DetailParagraph adjective="most amazing" number={2023} />
        </div>
    );
} */

/* with React.Fragment */
function PageHeader() {
    return (
        <React.Fragment>
            <Header1 name="Mary" />
            <DetailParagraph adjective="most amazing" number={2023} />
        </React.Fragment>
    );
}

let mainHeaderDiv = document.querySelector("div .header");
ReactDOM.render(<PageHeader />, mainHeaderDiv);

mainHeaderDiv.setAttribute("style", "background-color: beige");

let mainListDiv = document.querySelector("div .bodyList");
ReactDOM.render(<BodyList dishes={dishObjects} />, mainListDiv);

/* Images with React Components */
function FooterImage(props) {
    return (
        <img
            height={props.height}
            width={props.width}
            src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Chef preparing a plate."
        />
    );
}

let imageDiv = document.querySelector("div .image-footer");
ReactDOM.render(<FooterImage height={200} width={300} />, imageDiv);

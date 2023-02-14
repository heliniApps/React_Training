/* Handling State */
import { useState, useEffect } from "react";

// useState()
function UseStateTest() {
    const whatIsUseState = useState(); // ans: array with two elements. (init state, function to update state)
    console.log("whatIsUseState: ", whatIsUseState);
    return <h3>Current State: {whatIsUseState}</h3>;
}

function UseStateTest() {
    const [currentState, setState] = useState("Happy!!");

    console.log("currentState: ", currentState);

    return (
        <React.Fragment>
            <h3>Current State: {currentState}</h3>
            <button onClick={() => setState("Exited%%")}>Exited!!</button>
        </React.Fragment>
    );
}

// useEffect()
function UseEffectTest() {
    let count = 1;

    useEffect(() => console.log("Count: ", count), [count]);

    return (
        <React.Fragment>
            <h2>Counter: {count}</h2>
            <button onClick={() => count++}>Update Count</button>
        </React.Fragment>
    );
}

function UseEffectTest() {
    let initialCount = 1;

    let [count, updateCount] = useState(initialCount);

    useEffect(() => console.log("Count: ", count), [count]);

    return (
        <React.Fragment>
            <h2>Counter: {count}</h2>
            <button onClick={() => updateCount(++count)}>
                Update Count {count}
            </button>
        </React.Fragment>
    );
}

function UseEffectTest() {
    let initialCount = 1;

    let [count, updateCount] = useState(initialCount);
    let [emotion, setEmotion] = useState("happy!!");

    useEffect(
        () => console.log(`Count is "${count}" & Emotion is "${emotion}".`),
        [count, emotion]
    );

    return (
        <React.Fragment>
            <h2>Counter: {count}</h2>
            <button
                onClick={() => {
                    updateCount(++count);
                    setEmotion(`Exited * ${count} :)`);
                }}
            >
                Update Count {count}
            </button>
        </React.Fragment>
    );
}

// useReducer()
import { useReducer } from "react";

// useState()  v1
function UseReducerTest() {
    const [checked, setChecked] = useState(false);

    return (
        <React.Fragment>
            <input
                type="checkbox"
                value={checked}
                onChange={() => setChecked(!checked)}
            />
            <label>{checked ? "Checked" : "Not Checked"}</label>
        </React.Fragment>
    );
}

// useState()  v2
function UseReducerTest() {
    const [checked, setChecked] = useState(false);

    return (
        <React.Fragment>
            <input
                type="checkbox"
                value={setChecked}
                onChange={() =>
                    // this anonymous function takes the "event" argument, by default.
                    setChecked((val) => {
                        // this anonymous function takes "checked" variable's value as argument, by default.
                        console.log(val); // ans:  prints the current value/state of "checked" variable.
                        return !val;
                    })
                }
            />
            <label>{checked ? "Checked" : "Not Checked"}</label>
        </React.Fragment>
    );
}

function UseReducerTest() {
    // useReducer()
    const [checked, setChecked] = useReducer((val) => {
        console.log(val);
        return !val;
    }, false);

    return (
        <React.Fragment>
            <input type="checkbox" value={checked} onChange={setChecked} />
            <label>{checked ? "Checked" : "Not Checked"}</label>
        </React.Fragment>
    );
}

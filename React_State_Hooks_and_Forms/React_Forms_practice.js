/* "useRef()" Hook */
import { useRef, useState } from "react";

function ColorForm() {
    let colorNameRef = useRef();
    let pickerRef = useRef();

    const onFormSubmitEvent = (event) => {
        event.preventDefault();

        // assigning color-picker's value to text field.
        colorNameRef.current.value = pickerRef.current.value;

        alert("Picked Color: ", colorNameRef.current.value);

        // resetting color-picker value.
        pickerRef.current.value = "#0000ff";
    };

    return (
        <form onSubmit={onFormSubmitEvent}>
            <input
                ref={colorNameRef}
                type="text"
                name="color-name"
                placeholder="Color Name..."
            />
            <input ref={pickerRef} type="color" id="color-picker" />
            <button>Apply</button>
        </form>
    );
}

/* Controlled Components */
/* Creating a Controlled Component using "useState()" Hook */
function ControlledComponentForm() {
    let [colorName, setColorName] = useState("");
    let [hexColor, setHexColor] = useState("#00ff00");

    const onFormSubmit = (event) => {
        event.preventDefault();
        /* we don't need the below "querySelector()" because, 
        Elements' "value" properties are attached to the "State" variables. */
        // let colorPickElem = document.querySelector("#color-picker");
        // colorPickElem.value = colorName;

        /* correct way to access Elements  */
        setHexColor(colorName);
        setColorName("");
    };

    const onTextChange = (event) => setColorName(event.target.value);

    const onColorChange = (event) => setHexColor(event.target.value);

    return (
        <form onSubmit={onFormSubmit}>
            <input
                type="text"
                name="color-name"
                value={colorName}
                onChange={onTextChange}
            />
            <input
                type="color"
                id="color-picker"
                value={hexColor}
                onChange={onColorChange}
            />
            <button>Apply</button>
        </form>
    );
}

/* Creating Custom Hooks */

function useInput(initialValue) {
    // Sets a value.
    let [value, setValue] = useState(initialValue);

    // returns an Array of 3 items
    return [
        {
            value,
            onChange: (event) => setValue(event.target.value),
        },
        setValue,
        () => setValue(initialValue),
    ];
}

function UsingCustomHook() {
    let [colorNameProps, setColorName, resetColorName] = useInput("");
    let [hexColorProps, setHexColor, resetHexColor] = useInput("#DD3654");

    const onFormSubmit = (event) => {
        event.preventDefault();

        setHexColor(colorNameProps.value);
        resetColorName();
    };

    const onColorPickerChange = (event) => {
        let pickedColor = event.target.value;
        setHexColor(pickedColor);
        setColorName(pickedColor);
        console.log("colorNameProps.value:", colorNameProps.value); // ans: value before change.
        console.log("hexColorProps.value:", hexColorProps.value); // ans: value before change.
    };
    hexColorProps.onChange = onColorPickerChange;

    return (
        <form onSubmit={onFormSubmit}>
            <input type="text" name="color-name" {...colorNameProps} />
            <input type="color" id="color-picker" {...hexColorProps} />
            <button>Apply</button>
        </form>
    );
}

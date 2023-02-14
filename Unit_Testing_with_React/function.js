import { useReducer } from "react";

export function timesTwo(inputNum) {
    return inputNum * 2;
}

export function Star() {
    return (
        <div>
            <h2>Cool Star!</h2>
        </div>
    );
}

export function CheckboxAndLabel() {
    let [checked, setChecked] = useReducer((isChecked) => !isChecked, false);

    return (
        <div>
            <label htmlFor="checkedBox">
                {checked ? "Checked" : "Not Checked"}
            </label>
            <input
                id="checkedBox"
                type="checkbox"
                value={checked}
                onChange={setChecked}
            />
        </div>
    );
}

import { render, fireEvent } from "@testing-library/react";
import { timesTwo, Star, CheckboxAndLabel } from "./function";

test("Testing Multiplying by Two", () => {
    expect(timesTwo(4)).toBeLessThan(9);
    expect(timesTwo(4)).toBe(8);
});

test("Rendering a React Component", () => {
    const { getByText } = render(<Star />);
    const h2Elem = getByText(/cool star/i);

    expect(h2Elem).toBeDefined();
    expect(h2Elem.innerHTML).toContain("Cool Star!");

    // expect(h2Elem).toHaveTextContent("Cool Star!");
});

test("Firing onChange Event from Checkbox", () => {
    const { getByLabelText } = render(<CheckboxAndLabel />);
    let checkboxElem = getByLabelText(/not checked/i);

    fireEvent.click(checkboxElem);
    expect(checkboxElem.checked).toEqual(true);
});

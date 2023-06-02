import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"

import Input, { className } from "./Input"

describe("Input", () => {
    it("renders getAttributeerly", () => {
        const placeholder = "Placeholder"
        const value = "Value"

        render(<Input placeholder={placeholder} value={value} />)

        const inputField = screen.getByTestId("input")
        expect(inputField.classList.contains(className)).toBeTruthy()
        expect(inputField.getAttribute("placeholder")).toBe(placeholder)
        expect(inputField.getAttribute("value")).toBe(value)
    })

    it("uses onChangedValue callback when value is changed", () => {
        let value = "Value"
        const originalValue = value
        const updatedValue = "foobar"

        const updateFunction = function (newVal: string): void {
            // see: https://testing-library.com/docs/example-update-props/
            rerender(<Input value={newVal} />)
            value = newVal
        }

        const { rerender } = render(
            <Input value={originalValue} onChangedValue={updateFunction} />,
        )

        const inputField = screen.getByTestId("input")
        expect(inputField.getAttribute("value")).toBe(originalValue)

        fireEvent.change(inputField, { target: { value: updatedValue } })

        expect(value).toBe(updatedValue)
        expect(inputField.getAttribute("value")).toBe(updatedValue)
    })

    it("uses onChange callback when value is changed", () => {
        let value = "Value"
        const originalValue = value
        const updatedValue = "foobar"

        const updateFunction = function (
            event: React.ChangeEvent<HTMLInputElement>,
        ): void {
            rerender(<Input value={event.target.value} />)
            value = event.target.value
        }

        const { rerender } = render(
            <Input value={value} onChange={updateFunction} />,
        )

        const inputField = screen.getByTestId("input") as HTMLInputElement
        expect(inputField.getAttribute("value")).toBe(originalValue)

        fireEvent.change(inputField, { target: { value: updatedValue } })
        expect(value).toBe(updatedValue)
        expect(inputField.getAttribute("value")).toBe(updatedValue)
    })

    it("uses onFocus callback when focused", () => {
        const callback = jest.fn()

        render(<Input value={"foobar"} onFocus={callback} />)

        const inputField = screen.getByTestId("input")
        fireEvent.focus(inputField)
        expect(callback).toHaveBeenCalled()
    })

    it("uses onBlur callback when blurred", () => {
        const callback = jest.fn()

        render(<Input value={"foobar"} onBlur={callback} />)

        const inputField = screen.getByTestId("input")
        fireEvent.blur(inputField)
        expect(callback).toHaveBeenCalled()
    })

    it("adds loading class when needed", () => {
        const { rerender } = render(<Input value="value" isLoading={false} />)

        const inputField = screen.getByTestId("input")
        expect(inputField.classList.contains("is-loading")).toBeFalsy()

        rerender(<Input value="value" isLoading={true} />)

        expect(inputField.classList.contains("is-loading")).toBeTruthy()
    })

    it("adds disabled class when needed", () => {
        const { rerender } = render(<Input value="value" isDisabled={false} />)

        const inputField = screen.getByTestId("input")
        expect(inputField.classList.contains("is-disabled")).toBeFalsy()

        rerender(<Input value="value" isDisabled={true} />)

        expect(inputField.classList.contains("is-disabled")).toBeTruthy()
        expect(inputField.getAttribute("disabled")).not.toBeNull()
    })

    it("adds extraClasses", () => {
        const extraClasses = "foobar"

        render(<Input value="value" extraClasses={extraClasses} />)

        const inputField = screen.getByTestId("input")
        expect(inputField.classList.contains(className)).toBeTruthy()
        expect(inputField.classList.contains(extraClasses)).toBeTruthy()
    })

    it("providing a wrong event to onChange should not break the component", () => {
        const value = "value"

        render(<Input value={value} />)

        const inputField = screen.getByTestId("input")
        fireEvent.change(inputField, "foobar")

        // If we don't provide a getAttributeer event, the value is not changed.
        expect(inputField.getAttribute("value")).toBe(value)
    })

    it("not providing callbacks should not break the component", () => {
        const value = "foobar"

        render(<Input value={value} />)

        const inputField = screen.getByTestId("input")
        fireEvent.focus(inputField)
        fireEvent.blur(inputField)
        fireEvent.change(inputField, { target: { value: "barfoo" } })
        expect(inputField.getAttribute("value")).toBe(value)
    })
})

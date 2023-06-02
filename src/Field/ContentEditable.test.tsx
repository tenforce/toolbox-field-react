import React from "react"
import { ContentEditableEvent } from "react-contenteditable"
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import ContentEditable, { className } from "./ContentEditable"

describe("ContentEditable", () => {
    it("renders properly", () => {
        const placeholder = "Placeholder"
        const value = "Value"

        render(<ContentEditable placeholder={placeholder} value={value} />)

        const contentEditable = screen.getByTestId("contentEditable")
        expect(contentEditable.classList.contains(className)).toBeTruthy()
        expect(
            contentEditable.classList.contains(`${className}--textarea`),
        ).toBeTruthy()
        expect(contentEditable.getAttribute("placeholder")).toBe(placeholder)
        expect(contentEditable.textContent).toBe(value)
    })

    it("uses onChangedValue callback when value is changed", async () => {
        const user = userEvent.setup()

        let value = "Value"
        const originalValue = value

        const updateValue = function (newVal: string): void {
            rerender(<ContentEditable value={newVal} />)
            value = newVal
        }

        const { rerender } = render(
            <ContentEditable value={value} onChangedValue={updateValue} />,
        )

        const contentEditable = screen.getByTestId("contentEditable")
        expect(contentEditable.textContent).toBe(originalValue)

        await user.click(contentEditable)
        await user.keyboard("a")

        expect(value).toBe(`${originalValue}a`)
        expect(contentEditable.textContent).toBe(`${originalValue}a`)
    })

    it("uses onChange callback when value is changed", async () => {
        const user = userEvent.setup()

        let value = "Value"
        const originalValue = value

        const updateValue = function (event: ContentEditableEvent): void {
            rerender(
                <ContentEditable
                    value={event.target.value}
                    onChange={updateValue}
                />,
            )
            value = event.target.value
        }

        const { rerender } = render(
            <ContentEditable value={value} onChange={updateValue} />,
        )

        const contentEditable = screen.getByTestId("contentEditable")

        expect(contentEditable.textContent).toBe(originalValue)

        await user.click(contentEditable)
        await user.keyboard("a")

        expect(value).toBe(`${originalValue}a`)
        expect(contentEditable.textContent).toBe(`${originalValue}a`)
    })

    it("uses onBlur callback when blurred", () => {
        const callback = jest.fn()

        render(<ContentEditable value={"foobar"} onBlur={callback} />)

        const contentEditable = screen.getByTestId("contentEditable")
        fireEvent.blur(contentEditable)
        expect(callback).toHaveBeenCalled()
    })

    it("adds loading class when needed", () => {
        const { rerender } = render(
            <ContentEditable value="value" isLoading={false} />,
        )

        const contentEditable = screen.getByTestId("contentEditable")
        expect(contentEditable.classList.contains("is-loading")).toBeFalsy()

        rerender(<ContentEditable value="value" isLoading={true} />)
        expect(contentEditable.classList.contains("is-loading")).toBeTruthy()
    })

    it("adds disabled class when needed", () => {
        const { rerender } = render(
            <ContentEditable value="value" isDisabled={false} />,
        )

        const contentEditable = screen.getByTestId("contentEditable")
        expect(contentEditable.classList.contains("is-disabled")).toBeFalsy()

        rerender(<ContentEditable value="value" isDisabled={true} />)
        expect(contentEditable.classList.contains("is-disabled")).toBeTruthy()
    })

    it("adds extraClasses", () => {
        const extraClasses = "foobar"

        render(<ContentEditable value="value" extraClasses={extraClasses} />)

        const contentEditable = screen.getByTestId("contentEditable")
        expect(contentEditable.classList.contains(className)).toBeTruthy()
        expect(contentEditable.classList.contains(extraClasses)).toBeTruthy()
    })

    it("providing a wrong event to onChange should not break the component", () => {
        const value = "value"

        render(<ContentEditable value={value} />)

        const contentEditable = screen.getByTestId("contentEditable")
        fireEvent.change(contentEditable, "foobar")

        // If we don't provide a proper event, the value is not changed.
        expect(contentEditable.textContent).toBe(value)
    })

    it("not providing callbacks should not break the component", () => {
        const value = "foobar"

        render(<ContentEditable value={value} />)

        const contentEditable = screen.getByTestId("contentEditable")

        fireEvent.focus(contentEditable)
        fireEvent.blur(contentEditable)
        fireEvent.keyPress(contentEditable, { key: "A" })
        expect(contentEditable.textContent).toBe(value)
    })
})

import React from "react"
import TextArea, { className } from "./TextArea"
import { fireEvent, render, screen } from "@testing-library/react"

describe("TextArea", () => {
    describe("simple", () => {
        it("renders properly", () => {
            const placeholder = "Placeholder"
            const value = "Value"

            render(<TextArea placeholder={placeholder} value={value} />)

            const textareaField = screen.getByTestId("textarea")
            expect(textareaField.classList.contains(className)).toBeTruthy()
            expect(textareaField.getAttribute("placeholder")).toBe(placeholder)
            expect(textareaField.textContent).toBe(value)
        })

        it("uses onChangedValue callback when value is changed", () => {
            let value = "Value"
            const originalValue = value
            const updatedValue = "foobar"

            const updateFunction = function (newVal: string): void {
                // see: https://testing-library.com/docs/example-update-props/
                rerender(<TextArea value={newVal} />)
                value = newVal
            }

            const { rerender } = render(
                <TextArea
                    value={originalValue}
                    onChangedValue={updateFunction}
                />,
            )

            const textareaField = screen.getByTestId("textarea")
            expect(textareaField.textContent).toBe(originalValue)

            fireEvent.change(textareaField, { target: { value: updatedValue } })

            expect(value).toBe(updatedValue)
            expect(textareaField.textContent).toBe(updatedValue)
        })

        it("uses onChange callback when value is changed", () => {
            let value = "Value"
            const originalValue = value
            const updatedValue = "foobar"

            const updateFunction = function (
                event: React.ChangeEvent<HTMLTextAreaElement>,
            ): void {
                rerender(<TextArea value={event.target.value} />)
                value = event.target.value
            }

            const { rerender } = render(
                <TextArea value={value} onChange={updateFunction} />,
            )

            const textareaField = screen.getByTestId(
                "textarea",
            ) as HTMLTextAreaElement
            expect(textareaField.textContent).toBe(originalValue)

            fireEvent.change(textareaField, { target: { value: updatedValue } })
            expect(value).toBe(updatedValue)
            expect(textareaField.textContent).toBe(updatedValue)
        })

        it("uses onFocus callback when focused", () => {
            const callback = jest.fn()

            render(<TextArea value={"foobar"} onFocus={callback} />)

            const textareaField = screen.getByTestId("textarea")
            fireEvent.focus(textareaField)
            expect(callback).toHaveBeenCalled()
        })

        it("uses onBlur callback when blurred", () => {
            const callback = jest.fn()

            render(<TextArea value={"foobar"} onBlur={callback} />)

            const textareaField = screen.getByTestId("textarea")
            fireEvent.blur(textareaField)
            expect(callback).toHaveBeenCalled()
        })

        it("adds loading class when needed", () => {
            const { rerender } = render(
                <TextArea value="value" isLoading={false} />,
            )

            const textareaField = screen.getByTestId("textarea")
            expect(textareaField.classList.contains("is-loading")).toBeFalsy()

            rerender(<TextArea value="value" isLoading={true} />)

            expect(textareaField.classList.contains("is-loading")).toBeTruthy()
        })

        it("adds disabled class when needed", () => {
            const { rerender } = render(
                <TextArea value="value" isDisabled={false} />,
            )

            const textareaField = screen.getByTestId("textarea")
            expect(textareaField.classList.contains("is-disabled")).toBeFalsy()

            rerender(<TextArea value="value" isDisabled={true} />)

            expect(textareaField.classList.contains("is-disabled")).toBeTruthy()
            expect(textareaField.getAttribute("disabled")).not.toBeNull()
        })

        it("adds extraClasses", () => {
            const extraClasses = "foobar"

            render(<TextArea value="value" extraClasses={extraClasses} />)

            const textareaField = screen.getByTestId("textarea")
            expect(textareaField.classList.contains(className)).toBeTruthy()
            expect(textareaField.classList.contains(extraClasses)).toBeTruthy()
        })

        it("providing a wrong event to onChange should not break the component", () => {
            const value = "value"

            render(<TextArea value={value} />)

            const textareaField = screen.getByTestId("textarea")
            fireEvent.change(textareaField, "foobar")

            // If we don't provide a getAttributeer event, the value is not changed.
            expect(textareaField.textContent).toBe(value)
        })

        it("not providing callbacks should not break the component", () => {
            const value = "foobar"

            render(<TextArea value={value} />)

            const textareaField = screen.getByTestId("textarea")
            fireEvent.focus(textareaField)
            fireEvent.blur(textareaField)
            fireEvent.change(textareaField, { target: { value: "barfoo" } })
            expect(textareaField.textContent).toBe(value)
        })
    })

    describe("autosize", () => {
        it("renders properly", () => {
            const placeholder = "Placeholder"
            const value = "Value"

            render(
                <TextArea
                    autoSize={true}
                    placeholder={placeholder}
                    value={value}
                />,
            )

            const textareaField = screen.getByTestId("textarea")
            expect(textareaField.classList.contains(className)).toBeTruthy()
            expect(textareaField.getAttribute("placeholder")).toBe(placeholder)
            expect(textareaField.textContent).toBe(value)
        })

        it("uses onChangedValue callback when value is changed", () => {
            let value = "Value"
            const originalValue = value
            const updatedValue = "foobar"

            const updateFunction = function (newVal: string): void {
                // see: https://testing-library.com/docs/example-update-props/
                rerender(<TextArea autoSize={true} value={newVal} />)
                value = newVal
            }

            const { rerender } = render(
                <TextArea
                    autoSize={true}
                    value={originalValue}
                    onChangedValue={updateFunction}
                />,
            )

            const textareaField = screen.getByTestId("textarea")
            expect(textareaField.textContent).toBe(originalValue)

            fireEvent.change(textareaField, { target: { value: updatedValue } })

            expect(value).toBe(updatedValue)
            expect(textareaField.textContent).toBe(updatedValue)
        })

        it("uses onChange callback when value is changed", () => {
            let value = "Value"
            const originalValue = value
            const updatedValue = "foobar"

            const updateFunction = function (
                event: React.ChangeEvent<HTMLTextAreaElement>,
            ): void {
                rerender(
                    <TextArea autoSize={true} value={event.target.value} />,
                )
                value = event.target.value
            }

            const { rerender } = render(
                <TextArea
                    autoSize={true}
                    value={value}
                    onChange={updateFunction}
                />,
            )

            const textareaField = screen.getByTestId(
                "textarea",
            ) as HTMLTextAreaElement
            expect(textareaField.textContent).toBe(originalValue)

            fireEvent.change(textareaField, { target: { value: updatedValue } })
            expect(value).toBe(updatedValue)
            expect(textareaField.textContent).toBe(updatedValue)
        })

        it("uses onFocus callback when focused", () => {
            const callback = jest.fn()

            render(
                <TextArea
                    autoSize={true}
                    value={"foobar"}
                    onFocus={callback}
                />,
            )

            const textareaField = screen.getByTestId("textarea")
            fireEvent.focus(textareaField)
            expect(callback).toHaveBeenCalled()
        })

        it("uses onBlur callback when blurred", () => {
            const callback = jest.fn()

            render(
                <TextArea autoSize={true} value={"foobar"} onBlur={callback} />,
            )

            const textareaField = screen.getByTestId("textarea")
            fireEvent.blur(textareaField)
            expect(callback).toHaveBeenCalled()
        })

        it("adds loading class when needed", () => {
            const { rerender } = render(
                <TextArea autoSize={true} value="value" isLoading={false} />,
            )

            const textareaField = screen.getByTestId("textarea")
            expect(textareaField.classList.contains("is-loading")).toBeFalsy()

            rerender(
                <TextArea autoSize={true} value="value" isLoading={true} />,
            )

            expect(textareaField.classList.contains("is-loading")).toBeTruthy()
        })

        it("adds disabled class when needed", () => {
            const { rerender } = render(
                <TextArea autoSize={true} value="value" isDisabled={false} />,
            )

            const textareaField = screen.getByTestId("textarea")
            expect(textareaField.classList.contains("is-disabled")).toBeFalsy()

            rerender(
                <TextArea autoSize={true} value="value" isDisabled={true} />,
            )

            expect(textareaField.classList.contains("is-disabled")).toBeTruthy()
            expect(textareaField.getAttribute("disabled")).not.toBeNull()
        })

        it("adds extraClasses", () => {
            const extraClasses = "foobar"

            render(
                <TextArea
                    autoSize={true}
                    value="value"
                    extraClasses={extraClasses}
                />,
            )

            const textareaField = screen.getByTestId("textarea")
            expect(textareaField.classList.contains(className)).toBeTruthy()
            expect(textareaField.classList.contains(extraClasses)).toBeTruthy()
        })

        it("providing a wrong event to onChange should not break the component", () => {
            const value = "value"

            render(<TextArea autoSize={true} value={value} />)

            const textareaField = screen.getByTestId("textarea")
            fireEvent.change(textareaField, "foobar")

            // If we don't provide a getAttributeer event, the value is not changed.
            expect(textareaField.textContent).toBe(value)
        })

        it("not providing callbacks should not break the component", () => {
            const value = "foobar"

            render(<TextArea autoSize={true} value={value} />)

            const textareaField = screen.getByTestId("textarea")
            fireEvent.focus(textareaField)
            fireEvent.blur(textareaField)
            fireEvent.change(textareaField, { target: { value: "barfoo" } })
            expect(textareaField.textContent).toBe(value)
        })
    })
})

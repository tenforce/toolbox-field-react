import React from "react"
import ReadOnly, { className } from "./ReadOnly"
import { render, screen, within } from "@testing-library/react"

describe("ReadOnly", () => {
    it("renders string properly", () => {
        const value = "Value"

        render(<ReadOnly value={value} />)

        const readOnly = screen.getByTestId("readOnly")
        expect(readOnly.classList.contains(className)).toBeTruthy()
        expect(readOnly.textContent).toBe(value)
    })

    it("renders number properly", () => {
        const value = 1

        render(<ReadOnly value={value} />)

        const readOnly = screen.getByTestId("readOnly")
        expect(readOnly.classList.contains(className)).toBeTruthy()
        expect(readOnly.textContent).toBe(value.toString())
    })

    it("renders boolean properly", () => {
        const value = false

        render(<ReadOnly value={value} shouldAllowHTML={true} />)

        const readOnly = screen.getByTestId("readOnly")
        expect(readOnly.classList.contains(className)).toBeTruthy()
        expect(readOnly.textContent).toBe(value.toString())
    })

    it("renders embedded HTML properly", () => {
        const anchorContent = "Hierarchy item to test 6"
        const anchorClass = "anchor"
        const value = `<a class="${anchorClass}" href="http://localhost:5000/workspace/20/51l/2906">${anchorContent}</a>`

        render(<ReadOnly value={value} shouldAllowHTML={true} />)

        const readOnly = screen.getByTestId("readOnly")
        expect(readOnly.classList.contains(className)).toBeTruthy()

        const link = within(readOnly).getByRole("link")
        expect(link.classList.contains(`${anchorClass}`)).toBeTruthy()
        expect(link.textContent).toBe(anchorContent)
    })

    it("renders JSX.Element properly", () => {
        const anchorContent = "Hierarchy item to test 6"
        const anchorClass = "anchor"
        const value = (
            <a
                className={anchorClass}
                href="http://localhost:5000/workspace/20/51l/2906"
            >
                {anchorContent}
            </a>
        )

        render(<ReadOnly value={value} />)

        const readOnly = screen.getByTestId("readOnly")

        const link = within(readOnly).getByRole("link")
        expect(link.classList.contains(`${anchorClass}`)).toBeTruthy()
        expect(link.textContent).toBe(anchorContent)
    })

    it("adds loading class when needed", () => {
        render(<ReadOnly value={"value"} isLoading={false} data-testid="0" />)

        let readOnly = screen.getByTestId("0")
        expect(readOnly.classList.contains("is-loading")).toBeFalsy()

        render(<ReadOnly value={"value"} isLoading={true} data-testid="1" />)
        readOnly = screen.getByTestId("1")
        expect(readOnly.classList.contains("is-loading")).toBeTruthy()
    })

    it("adds preserveWhitespace class when needed", () => {
        render(
            <ReadOnly
                value={"value"}
                preserveWhitespace={false}
                data-testid="0"
            />,
        )

        let readOnly = screen.getByTestId("0")
        expect(
            readOnly.classList.contains(
                "toolbox-field__input--preserveWhitespace",
            ),
        ).toBeFalsy()

        render(
            <ReadOnly
                value={"value"}
                preserveWhitespace={true}
                data-testid="1"
            />,
        )
        readOnly = screen.getByTestId("1")
        expect(
            readOnly.classList.contains(
                "toolbox-field__input--preserveWhitespace",
            ),
        ).toBeTruthy()
    })

    it("adds extraClasses", () => {
        const extraClasses = "foobar"

        render(<ReadOnly value={"value"} extraClasses={extraClasses} />)

        const readOnly = screen.getByTestId("readOnly")
        expect(readOnly.classList.contains(className)).toBeTruthy()
        expect(readOnly.classList.contains(extraClasses)).toBeTruthy()
    })
})

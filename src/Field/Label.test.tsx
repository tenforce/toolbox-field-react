import React from "react"
import Label, { className } from "./Label"

import { render, screen, within } from "@testing-library/react"

describe("Label", () => {
    it("renders properly", () => {
        render(<Label />)

        const label = screen.getByTestId("label")
        expect(label.classList.contains(className)).toBeTruthy()
    })

    it("adds extraClasses", () => {
        const extraClasses = "foobar"

        render(<Label extraClasses={extraClasses} />)

        const label = screen.getByTestId("label")
        expect(label.classList.contains(className)).toBeTruthy()
        expect(label.classList.contains(extraClasses)).toBeTruthy()
    })

    it("isRequired displays span", () => {
        const requiredText = "requiredText"

        render(
            <Label
                isRequired={true}
                reqiredIndicatorText={requiredText}
                data-testid="0"
            />,
        )

        let label = screen.getByTestId("0")
        expect(label).toBeDefined()
        expect(label.childElementCount).toBe(1)

        const indicator = within(label).getByText(requiredText)
        expect(indicator).toBeDefined()

        render(
            <Label
                isRequired={false}
                reqiredIndicatorText={requiredText}
                data-testid="1"
            />,
        )

        label = screen.getByTestId("1")
        expect(label).toBeDefined()
        expect(label.childElementCount).toBe(0)
    })
})

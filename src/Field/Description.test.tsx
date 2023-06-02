import React from "react"
import { render, screen } from "@testing-library/react"

import Description, { className } from "./Description"
describe("Description", () => {
    it("renders properly", () => {
        render(<Description />)

        const description = screen.getByTestId("description")
        expect(description.classList.contains(className)).toBeTruthy()
    })

    it("adds extraClasses", () => {
        const extraClasses = "foobar"

        render(<Description extraClasses={extraClasses} />)

        const description = screen.getByTestId("description")
        expect(description.classList.contains(className)).toBeTruthy()
        expect(description.classList.contains(extraClasses)).toBeTruthy()
    })
})

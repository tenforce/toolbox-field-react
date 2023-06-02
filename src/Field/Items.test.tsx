import React from "react"
import { render, screen } from "@testing-library/react"

import Items, { className } from "./Items"

describe("Items", () => {
    it("renders properly", () => {
        render(<Items />)

        const items = screen.getByTestId("items")
        expect(items.classList.contains(className)).toBeTruthy()
    })

    it("adds extraClasses", () => {
        const extraClasses = "foobar"

        render(<Items extraClasses={extraClasses} />)

        const items = screen.getByTestId("items")
        expect(items.classList.contains(className)).toBeTruthy()
        expect(items.classList.contains(extraClasses)).toBeTruthy()
    })
})

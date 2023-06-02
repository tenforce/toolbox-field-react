import React from "react"
import Field, { className } from "./Field"
import { render, screen } from "@testing-library/react"

describe("Field", () => {
    it("renders properly", () => {
        render(<Field />)

        const wrapper = screen.getByTestId("field")
        expect(wrapper.classList.contains(className)).toBeTruthy()
    })

    it("adds whiteinput class when needed", () => {
        const { rerender } = render(<Field hasWhiteBackground={false} />)

        const wrapper = screen.getByTestId("field")
        expect(
            wrapper.classList.contains(`${className}--whiteinput`),
        ).toBeFalsy()

        rerender(<Field hasWhiteBackground={true} />)
        expect(
            wrapper.classList.contains(`${className}--whiteinput`),
        ).toBeTruthy()
    })

    it("adds inverted class when needed", () => {
        const { rerender } = render(<Field isInverted={false} />)

        const wrapper = screen.getByTestId("field")
        expect(wrapper.classList.contains(`${className}--inverted`)).toBeFalsy()

        rerender(<Field isInverted={true} />)
        expect(
            wrapper.classList.contains(`${className}--inverted`),
        ).toBeTruthy()
    })

    it("adds preview class when needed", () => {
        const { rerender } = render(<Field showPreview={false} />)

        const wrapper = screen.getByTestId("field")
        expect(wrapper.classList.contains(`${className}--preview`)).toBeFalsy()

        rerender(<Field showPreview={true} />)
        expect(wrapper.classList.contains(`${className}--preview`)).toBeTruthy()
    })

    it("adds extraClasses", () => {
        const extraClasses = "foobar"

        render(<Field extraClasses={extraClasses} />)

        const wrapper = screen.getByTestId("field")
        expect(wrapper.classList.contains(className)).toBeTruthy()
        expect(wrapper.classList.contains(extraClasses)).toBeTruthy()
    })
})

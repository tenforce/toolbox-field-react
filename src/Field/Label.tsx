import * as React from "react"
import bem from "../bem"
import classNames from "classnames"

import { className as parentClassName } from "./Field"
const b = bem(parentClassName, "label")
export const className = b()

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    extraClasses?: string
    isRequired?: boolean
    reqiredIndicatorText?: React.ReactNode
}

export default class Label extends React.PureComponent<Props> {
    static defaultProps: Partial<Props> = {
        extraClasses: "",
        isRequired: false,
        reqiredIndicatorText: "*",
    }

    render(): JSX.Element {
        const {
            extraClasses,
            children,
            isRequired,
            reqiredIndicatorText,
            ...attrs
        } = this.props

        // Add modifiers
        const modifiers = {}
        // Add bem modifiers
        const bemModifiers = {}
        // Generate fullClassName based on base className, eventual modifiers (BEM or not) and possible extra classes
        const fullClassName = classNames(
            b(bemModifiers),
            modifiers,
            extraClasses,
        )

        return (
            <div className={fullClassName} data-testid="label" {...attrs}>
                {children}
                {isRequired && <span>{reqiredIndicatorText}</span>}
            </div>
        )
    }
}

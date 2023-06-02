import * as React from "react"
import bem from "../bem"
import classNames from "classnames"

import { className as parentClassName } from "./Field"
const b = bem(parentClassName, "description")
export const className = b()

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    extraClasses?: string
}

export default class Description extends React.PureComponent<Props> {
    static defaultProps: Partial<Props> = {
        extraClasses: "",
    }

    render(): JSX.Element {
        const { extraClasses, children, ...attrs } = this.props

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
            <div className={fullClassName} data-testid="description" {...attrs}>
                {children}
            </div>
        )
    }
}

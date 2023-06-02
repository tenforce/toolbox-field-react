import * as React from "react"
import bem from "../bem"
import classNames from "classnames"

import { className as parentClassName } from "./Field"
const b = bem(parentClassName, "input")
export const className = b()

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    extraClasses?: string
    preserveWhitespace?: boolean
    isLoading?: boolean
    shouldAllowHTML?: boolean
    value: string | number | boolean | JSX.Element
}

export default class ReadOnly extends React.PureComponent<Props> {
    static defaultProps: Partial<Props> = {
        extraClasses: "",
        preserveWhitespace: true,
        isLoading: false,
        shouldAllowHTML: false,
        value: "",
    }

    render(): JSX.Element {
        const {
            isLoading,
            value,
            extraClasses,
            shouldAllowHTML,
            preserveWhitespace,
            ...attrs
        } = this.props

        // Add modifiers
        const modifiers = {
            "is-loading": isLoading,
        }
        // Add bem modifiers
        const bemModifiers = {
            preserveWhitespace,
        }
        // Generate fullClassName based on base className, eventual modifiers (BEM or not) and possible extra classes
        const fullClassName = classNames(
            b(bemModifiers),
            modifiers,
            extraClasses,
        )

        // we cannot set both {children} and dangerouslySetInnerHTML
        // so depending on the type of the value we set one or the other
        if (React.isValidElement(value) || !shouldAllowHTML) {
            return (
                <div
                    className={fullClassName}
                    data-testid="readOnly"
                    {...attrs}
                >
                    {value}
                </div>
            )
        }

        // As the props extend the React.HTMLAttributes<HTMLDivElement> there is a chance
        // that the dangerouslySetInnerHTML already has a value. In that case
        // we don't want to override it with the default value of `value`.
        if (!attrs.dangerouslySetInnerHTML) {
            attrs.dangerouslySetInnerHTML = { __html: `${value}` }
        }

        return (
            <div className={fullClassName} data-testid="readOnly" {...attrs} />
        )
    }
}

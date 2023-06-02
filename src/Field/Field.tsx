import * as React from "react"
import bem from "../bem"
import classNames from "classnames"

export const className = "toolbox-field"
const b = bem(className)

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    hasWhiteBackground?: boolean
    isInverted?: boolean
    showPreview?: boolean
    extraClasses?: string
}

export const Field = React.forwardRef<HTMLDivElement, Props>(
    (props, ref): JSX.Element => {
        const {
            hasWhiteBackground = false,
            isInverted = false,
            showPreview = false,
            extraClasses = "",
            children,
            ...attrs
        } = props

        // Add modifiers
        const modifiers = {}
        // Add bem modifiers
        const bemModifiers = {
            whiteinput: hasWhiteBackground,
            inverted: isInverted,
            preview: showPreview,
        }
        // Generate fullClassName based on base className, eventual modifiers (BEM or not) and possible extra classes
        const fullClassName = classNames(
            b(bemModifiers),
            modifiers,
            extraClasses,
        )

        return (
            <div
                className={fullClassName}
                data-testid="field"
                {...attrs}
                ref={ref}
            >
                {children}
            </div>
        )
    },
)

Field.displayName = "Field"

export default Field

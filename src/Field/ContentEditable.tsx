import * as React from "react"
import ReactContentEditable, {
    ContentEditableEvent,
    Props as ContentEditableProps,
} from "react-contenteditable"

import bem from "../bem"
import classNames from "classnames"

import { className as parentClassName } from "./Field"
const b = bem(parentClassName, "input")
export const className = b()

export interface Props extends Partial<ContentEditableProps> {
    isLoading?: boolean
    isDisabled?: boolean
    extraClasses?: string
    value: string
    onChange?: (event: ContentEditableEvent) => void
    onChangedValue?: (value: string) => unknown
}

const ContentEditable = React.forwardRef<HTMLElement, Props>(
    (props, ref): JSX.Element => {
        const {
            isLoading = false,
            isDisabled = false,
            placeholder = "",
            extraClasses = "",
            value = "",
            onChangedValue,
            // these props get overriden by ...attrs otherwise
            html,
            onChange,
            innerRef: _innerRef,
            ref: _ref,
            ...attrs
        } = props

        const handleOnChange = React.useCallback(
            (event: ContentEditableEvent) => {
                if (props.onChange) {
                    return props.onChange(event)
                }

                const value = event?.target?.value || ""
                if (props.onChangedValue) {
                    return props.onChangedValue(value)
                }
            },
            [props.onChange, props.onChangedValue],
        )

        // Add modifiers
        const modifiers = {
            "is-disabled": isDisabled,
            "is-loading": isLoading,
        }
        // Add bem modifiers
        const bemModifiers = { textarea: true }
        // Generate fullClassName based on base className, eventual modifiers (BEM or not) and possible extra classes
        const fullClassName = classNames(
            b(bemModifiers),
            modifiers,
            extraClasses,
        )

        return (
            <ReactContentEditable
                className={fullClassName}
                placeholder={placeholder}
                html={value}
                onChange={handleOnChange}
                data-testid="contentEditable"
                innerRef={ref as React.RefObject<HTMLElement>}
                {...attrs}
            />
        )
    },
)

ContentEditable.displayName = "ContentEditable"

export default ContentEditable

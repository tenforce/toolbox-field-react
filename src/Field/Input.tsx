import * as React from "react"
import bem from "../bem"
import classNames from "classnames"

import { className as parentClassName } from "./Field"
const b = bem(parentClassName, "input")
export const className = b()

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    isLoading?: boolean
    isDisabled?: boolean
    placeholder?: string
    extraClasses?: string
    value: string
    onChangedValue?: (value: string) => unknown
    onChange?: React.ChangeEventHandler
    onFocus?: React.FocusEventHandler
    onBlur?: React.FocusEventHandler
}

const Input = React.forwardRef<HTMLInputElement, Props>(
    (props, ref): JSX.Element => {
        const {
            isLoading = false,
            isDisabled = false,
            placeholder = "",
            extraClasses = "",
            value = "",
            onChange,
            onChangedValue,
            ...attrs
        } = props

        // Add modifiers
        const modifiers = {
            "is-disabled": isDisabled,
            "is-loading": isLoading,
        }
        // Add bem modifiers
        const bemModifiers = {}
        // Generate fullClassName based on base className, eventual modifiers (BEM or not) and possible extra classes
        const fullClassName = classNames(
            b(bemModifiers),
            modifiers,
            extraClasses,
        )

        const handleOnChange = React.useCallback(
            (
                event: React.ChangeEvent<HTMLInputElement>,
            ): React.FormEventHandler | void | unknown => {
                if (props.onChange) {
                    return props.onChange(event)
                }

                const value =
                    event && event.target && event.target.value
                        ? event.target.value
                        : ""
                if (props.onChangedValue) {
                    return props.onChangedValue(value)
                }
            },
            [props.onChange, props.onChangedValue],
        )

        const handleOnFocus = React.useCallback(
            (
                event: React.FocusEvent<HTMLInputElement>,
            ): React.FocusEventHandler | void => {
                if (props.onFocus) {
                    return props.onFocus(event)
                }
            },
            [props.onFocus],
        )

        const handleOnBlur = React.useCallback(
            (
                event: React.FocusEvent<HTMLInputElement>,
            ): React.FocusEventHandler | void => {
                if (props.onBlur) {
                    return props.onBlur(event)
                }
            },
            [props.onBlur],
        )

        return (
            <input
                ref={ref}
                className={fullClassName}
                placeholder={placeholder}
                disabled={isDisabled}
                value={value}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                data-testid="input"
                {...attrs}
            />
        )
    },
)

Input.displayName = "Input"

export default Input

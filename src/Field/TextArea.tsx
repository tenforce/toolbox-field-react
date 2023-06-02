import * as React from "react"
import TextareaAutosize from "react-textarea-autosize"

import bem from "../bem"
import classNames from "classnames"

import { className as parentClassName } from "./Field"
const b = bem(parentClassName, "input")
export const className = b()

type AutosizeStyle = Omit<
    NonNullable<React.TextareaHTMLAttributes<HTMLTextAreaElement>["style"]>,
    "maxHeight" | "minHeight"
> & {
    height?: number
}

export type TextareaHeightChangeMeta = {
    rowHeight: number
}

export interface AutosizeProps {
    maxRows?: number
    minRows?: number
    onHeightChange?: (height: number, meta: TextareaHeightChangeMeta) => void
    cacheMeasurements?: boolean
    style?: AutosizeStyle
}

export interface Props
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    isLoading?: boolean
    isDisabled?: boolean
    placeholder?: string
    autoSize?: boolean
    extraClasses?: string
    value: string
    onChangedValue?: (value: string) => unknown
    onChange?: React.FormEventHandler
    onFocus?: React.FocusEventHandler
    onBlur?: React.FocusEventHandler
    autosizeProps?: AutosizeProps
}

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(
    (props, ref): JSX.Element => {
        const {
            isLoading = false,
            isDisabled = false,
            placeholder = "",
            autoSize = false,
            extraClasses = "",
            value = "",
            onChangedValue,
            style,
            autosizeProps,
            ...attrs
        } = props

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

        const handleOnChange = React.useCallback(
            (
                event: React.ChangeEvent<HTMLTextAreaElement>,
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
                event: React.FocusEvent<HTMLTextAreaElement>,
            ): React.FocusEventHandler | void => {
                if (props.onFocus) {
                    return props.onFocus(event)
                }
            },
            [props.onFocus],
        )

        const handleOnBlur = React.useCallback(
            (
                event: React.FocusEvent<HTMLTextAreaElement>,
            ): React.FocusEventHandler | void => {
                if (props.onBlur) {
                    return props.onBlur(event)
                }
            },
            [props.onBlur],
        )

        return autoSize ? (
            <TextareaAutosize
                ref={ref}
                className={fullClassName}
                placeholder={placeholder}
                disabled={isDisabled}
                value={value}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                data-testid="textarea"
                {...autosizeProps}
                {...attrs}
            />
        ) : (
            <textarea
                ref={ref}
                className={fullClassName}
                placeholder={placeholder}
                disabled={isDisabled}
                value={value}
                onChange={handleOnChange}
                onFocus={handleOnFocus}
                onBlur={handleOnBlur}
                style={style}
                data-testid="textarea"
                {...attrs}
            />
        )
    },
)

TextArea.displayName = "TextArea"

export default TextArea

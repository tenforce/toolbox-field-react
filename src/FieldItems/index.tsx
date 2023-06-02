import * as React from "react"

import Description, { Props as DescriptionProps } from "../Field/Description"
import Field, { Props as FieldProps } from "../Field/Field"
import Items, { Props as ItemsProps } from "../Field/Items"
import Label, { Props as LabelProps } from "../Field/Label"

export interface Props extends FieldProps {
    description?: React.ReactNode
    descriptionProps?: DescriptionProps
    itemsProps?: ItemsProps
    label?: React.ReactNode
    labelProps?: LabelProps
}

export const FieldItems = React.forwardRef<HTMLDivElement, Props>(
    (props, ref): JSX.Element => {
        const {
            children,
            description,
            descriptionProps,
            itemsProps,
            label,
            labelProps,
            ...attrs
        } = props

        return (
            <Field {...attrs} ref={ref}>
                {label && <Label {...labelProps}>{label}</Label>}

                <Items {...itemsProps}>{children}</Items>

                {description && (
                    <Description {...descriptionProps}>
                        {description}
                    </Description>
                )}
            </Field>
        )
    },
)

FieldItems.displayName = "FieldItems"

export default FieldItems

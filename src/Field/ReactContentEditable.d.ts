// it is needed to use the ContentEditable
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ReactContentEditable from "react-contenteditable"

// We add "placeholder" as a valid prop for react-contenteditable.
// We wouldn't need to do that if the prop name was "data-placeholder" as Typescript would just ignore it.
// However, we want to keep this aligned with the other inputs
declare module "react-contenteditable" {
    export interface Props {
        placeholder?: string
    }
}

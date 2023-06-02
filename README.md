# toolbox-field-react

Tenforce toolbox field and text input components


## Parameters

Field:

-   `hasWhiteBackground`: Boolean, makes the input background white
-   `isInverted`: Boolean, makes the style inverted
-   `showPreview`: Boolean, whether previews should be shown for this field

Input / ContentEditable:

-   `placeholder`: String, shown when value is empty
-   `value`: String, content of the input
-   `isLoading`: Boolean, adds loading animation and disables input
-   `isDisabled`: Boolean, disables input
-   `inputRef`: Ref object, enabeling control of the native input element

TextArea :

-   `placeholder`: String, shown when value is empty
-   `value`: String, content of the input
-   `isLoading`: Boolean, adds loading animation and disables input
-   `isDisabled`: Boolean, disables input
-   `autoSize`: Boolean, should the component autosize itself to its content. By default false.
-   `autosizeProps`: Props specifically for the TextareaAutosize components, as it has restrictions. See documentation on [react-textarea-autosize](https://github.com/Andarist/react-textarea-autosize/tree/v8.3.3).
-   `textAreaRef`: Ref object, enabeling control of the native textArea element

ReadOnly:

-   `placeholder`: String, shown when value is empty
-   `value`: String, number, boolean or JSX.Element, content of the div. HTML will be rendered as dangerously set HTML, while JSX.Elements will be rendered as child components.
-   `isLoading`: Boolean, adds loading animation and disables input
-   `shouldAllowHTML`: Boolean, should it allow for dangerously set HTML in the value. Default is false.
-   `preserveWhitespace`: Boolean, should it preserve whitespace or not. CSS rule: `white-space: pre`. Default is true.

## Components

### Field

Top component, can contain two types of children:

-   Label
-   Items
-   Description

### Label

A simple label for the field

-   `isRequired`: Appends an indicator wrapped in a `span` after the label.
-   `reqiredIndicatorText`: Content of the required indicator, default is `*`

### Description

A simple description under the field items.

### Items

A container for the possible inputs, its child is usually one of the following:

-   Input
-   TextArea
-   ContentEditable
-   ReadOnly

### Input

Simple single line input component

### TextArea

Simple multi line input component. If `autoSize` is set to `true`, it will use the [react-textarea-autosize](https://github.com/Andarist/react-textarea-autosize/tree/v8.3.3) component.

### ContentEditable

Multi line input component that renders using list of <div>

### ReadOnly

Simple non-modifiable element containing a value

## Usage

```
<Field
  hasWhiteBackground={true}
  isInverted={false}
  extraClasses={""}
>
  <Label isRequired={false}>Label</Label>
  <Items>
    <Input
      placeholder={"Captain Placeholder"}
      value={"test"}
      isLoading={false}
      isDisabled={false}
      onChangedValue={(value) => this.setState({value: value})}
    />
    {/* OR */}
    <TextArea
      placeholder={"Captain Placeholder"}
      value={""}
      isLoading={false}
      isDisabled={false}
      autoSize={false}
      onChangedValue={(value) => this.setState({value: value})}
    />
    {/* OR */}
    <ContentEditable
      placeholder={"Captain Placeholder"}
      value={""}
      isLoading={false}
      isDisabled={false}
      onChangedValue={(value) => this.setState({value: value})}
    />
    {/* OR */}
    <ReadOnly
      value={""}
      isLoading={false}
    />
  </Items>
  <Descrpition>
    Description for the field
  </Descrpition>
</Field>
```

## Symlink issues

If you want to symlink this component, like we do it between the `src` and the `example` folder, you will need to modify your `example/webpack.config.js` file because the `autosize Textarea` has some issues with finding the good react version. Just add your `alias` code snippet like so within the `resolve`:

```json
resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            "react": path.resolve('./node_modules/react'),
            "reactDOM": path.resolve('./node_modules/react-dom')
        }
    },
```

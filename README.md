# Ember-bootstrap-markdown

A Bootstrap styled Ember component for editing markdown content.

## Installation

```
ember install:addon ember-bootstrap-markdown
```

## Usage

In your templates, render the component via `ember-bootstrap-markdown`:

```handlebars
{{ember-bootstrap-markdown
  class='col-xs-6 col-xs-offset-3'
  btns='heading,bold,italic,quote,link,image,list-ol,list-ul'
  applyAction='save'
  value=model.value
}}
```

### Options

#### btns

The desired formatting buttons for the editor.

#### applyAction

The desired action that will be sent back to you application when the *Apply* button is clicked.

#### value

The linked value that holds the content.

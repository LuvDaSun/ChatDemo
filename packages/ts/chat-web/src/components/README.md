All components are structured like this:

```ts
// first, the naming of the component

/**
 * The tag name of the component. This component can be used
 * as <app-component-name></app-component-name> in html. Always starts with `app-`
 */
const componentName = "app-component-name";
/**
 * The Components name if we want ot use is programmatically.
 */
export { Component as RouteLink };

// now follows the definition of the component

@customElement(componentName)
class Component extends LitElement {
  // component stuff
}

// and last but not least we register the component so we will get validation and
// autocompletion if we use this component as a tag

declare global {
  interface HTMLElementTagNameMap {
    [componentName]: Component;
  }
}
```

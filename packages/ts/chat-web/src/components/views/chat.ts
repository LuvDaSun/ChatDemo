import { LitElement, PropertyValueMap, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

const componentName = "app-chat-view";
export { Component as ChatView };

@customElement(componentName)
class Component extends LitElement {
  static styles = css`
    :host {
      overflow-y: auto;
      display: flex;
      flex-direction: column-reverse;
    }

    ul {
      bottom: 0;
      display: block;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }
    li {
      display: block;
      margin: 0;
      padding: 0;
    }
  `;

  @property({ attribute: false })
  accessor messages: Iterable<string> = [];

  sticky = true;

  render() {
    return html`
      <ul>
        ${repeat(
          this.messages,
          (message, index) => index,
          (message, index) => html` <li>${message}</li>`,
        )}
      </ul>
    `;
  }

  updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
    if (this.sticky) {
      this.scrollTop = this.scrollHeight;
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener("scroll", this.onScroll);
  }

  disconnectedCallback() {
    this.removeEventListener("scroll", this.onScroll);

    super.disconnectedCallback();
  }

  private onScroll = () => {
    this.sticky = this.scrollTop === this.scrollHeight - this.offsetHeight;
  };
}

declare global {
  interface HTMLElementTagNameMap {
    [componentName]: Component;
  }
}

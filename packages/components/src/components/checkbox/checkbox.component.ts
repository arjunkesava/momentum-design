import { CSSResult, html, nothing } from 'lit';
import { classMap } from 'lit-html/directives/class-map.js';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { DisabledMixin } from '../../utils/mixins/DisabledMixin';
import { NameMixin } from '../../utils/mixins/NameMixin';
import { ValueMixin } from '../../utils/mixins/ValueMixin';
import FormfieldWrapper from '../formfieldwrapper/formfieldwrapper.component';
import type { ValidationType } from '../formfieldwrapper/formfieldwrapper.types';
import { ICON_NAME } from './checkbox.constants';
import styles from './checkbox.styles';

/**
 * Checkboxes allow users to select multiple options from a list or turn an item/feature on or off.
 * These are often used in forms, settings, and selections in lists.
 *
 * A checkbox component contains an optional label and an optional helper text.
 *
 * @dependency mdc-icon
 *
 * @tagname mdc-checkbox
 */
class Checkbox extends NameMixin(ValueMixin(DisabledMixin(FormfieldWrapper))) {
  /**
   * Determines whether the checkbox is selected or unselected.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true }) checked = false;

  /**
   * This property is used to determine the parent checkbox in a nested checkbox group.
   * If any one of the children is unselected, then the parent checkbox will be indeterminate.
   * If all children are either selected or unselected, then the parent checkbox will not be indeterminate.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true }) indeterminate = false;

  constructor() {
    super();
    this.addEventListener('keydown', this.handleKeyDown);

    // Checkbox does not contain helpTextType property.
    this.helpTextType = undefined as unknown as ValidationType;
  }

  /**
   * Triggers a change event on the checkbox element.
   * This is used to dispatch the change event.
   */
  private triggerChangeEvent(): void {
    const changeEvent = new CustomEvent('change', {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail: {
        checked: this.checked,
      },
    });
    this.dispatchEvent(changeEvent);
  }

  /**
   * Toggles the state of the checkbox element.
   * If the checkbox element is not disabled,
   * then we will toggle its checked state
   * and also trigger a change event.
   */
  private toggleState(): void {
    if (!this.disabled) {
      this.checked = !this.checked;
      this.triggerChangeEvent();
    }
  }

  /**
   * Handles the keydown event on the checkbox.
   * If the checkbox is indeterminate or disabled, then the event is ignored.
   * If the key is 'Enter' or 'Space', the checkbox is toggled.
   *
   * @param event - The keyboard event.
   */
  private handleKeyDown(event: KeyboardEvent): void {
    if (this.disabled) {
      return;
    }
    if (['Enter', ' '].includes(event.key)) {
      this.handleClick(event);
    }
  }

  /**
   * Handles the click event on the checkbox.
   * Prevents the default action on the event,
   * and toggles the state of the checkbox.
   *
   * @param event - The click event.
   */
  private handleClick(event: Event): void {
    event.preventDefault();
    this.toggleState();
  }

  public override render() {
    const checkboxIconContent = (this.checked || this.indeterminate) ? html`
      <mdc-icon
        class="mdc-checkbox__icon"
        name="${this.indeterminate ? ICON_NAME.INDETERMINATE : ICON_NAME.CHECKED}"
        size="1"
        length-unit="rem"
      ></mdc-icon>
    ` : nothing;

    return html`
      <div class="mdc-checkbox__container ${classMap({ 'mdc-focus-ring': !this.disabled })}">
        <input
          id="${this.id}"
          type="checkbox"
          class="mdc-checkbox__input"
          name="${ifDefined(this.name)}"
          value="${ifDefined(this.value)}"
          ?checked="${this.checked}"
          ?disabled="${this.disabled}"
          aria-checked="${this.checked}"
          aria-disabled="${this.disabled}"
          aria-label="${ifDefined(this.label)}"
          tabindex="${this.disabled ? -1 : 0}"
          @click="${this.handleClick}"
        />
        <div class="mdc-checkbox__icon-container">${checkboxIconContent}</div>
      </div>
      <div>
        ${this.renderLabel()}
        ${this.renderHelperText()}
      </div>
    `;
  }

  public static override styles: Array<CSSResult> = [...FormfieldWrapper.styles, ...styles];
}

export default Checkbox;

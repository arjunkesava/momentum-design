import { CSSResult, html, PropertyValueMap } from 'lit';
import { property, state } from 'lit/decorators.js';
import styles from './button.styles';
import { Component } from '../../models';
import { BUTTON_COLORS, BUTTON_VARIANTS, DEFAULTS } from './button.constants';
import { isValidIconSize, isValidPillSize } from './button.utils';

/**
 * `mdc-button` is a versatile component that can be configured in various ways to suit different use cases.
 *
 * Button Types:
 * - **Pill button**: A button that contains text value. Commonly used for call to action, tags, or filters.
 * - **Pill button with icons**: A button containing an icon either on the left or right side of the button.
 * - **Icon button**: A button represented by just an icon without any text.
 *
 * Button Variants:
 * - **Primary**: Solid background color.
 * - **Secondary**: Transparent background with a solid border.
 * - **Tertiary**: No background or border, appears as plain text but retains all button functionalities.
 *
 * Button Colors:
 * - **Positive**: Green color.
 * - **Negative**: Red color.
 * - **Accent**: Blue color.
 * - **Promotional**: Yellow color.
 * - **Active**: White color.
 *
 * Button Sizes (in REM units):
 * - **Pill button**: 40, 32, 28, 24.
 * - **Icon button**: 64, 52, 40, 32, 28, 24.
 * - **Tertiary icon button**: 20.
 *
 * Slots:
 * - **prefix-icon**: `<mdc-icon>` component serves as either an icon within the icon button or
 *                   as an icon positioned to the left of the button text in a pill button with icon.
 * - **label-text**: A component to represent the text label of the button.
 * - **postfix-icon**: `<mdc-icon>` component serves as an icon positioned to the right
 *                      of the button text in a pill button with icon.
 *
 * The button type is determined based on the slots provided.
 *
 * @dependency mdc-icon
 *
 * @tagname mdc-button
 *
 * @slot prefix-icon - Icon positioned to the left of the button text or within an icon button.
 * @slot label-text - Text label of the button.
 * @slot postfix-icon - Icon positioned to the right of the button text.
 */
class Button extends Component {
  /**
   * Indicates whether the button is active.
   */
  @property({ type: Boolean }) active: boolean = false;

  /**
   * Indicates whether the button is disabled.
   */
  @property({ type: Boolean }) disabled: boolean = false;

  /**
   * Indicates whether the button is soft disabled.
   * The button is currently disabled for user interaction; however, it remains focusable.
   */
  @property({ type: Boolean, attribute: 'soft-disabled' }) softDisabled: boolean = false;

  /**
   * Aria label for the button.
   */
  @property({ type: String, attribute: 'aria-label' }) override ariaLabel: string = '';

  /**
   * There are 3 variants of button: primary, secondary, tertiary.
   */
  @property({ type: String }) variant = DEFAULTS.VARIANT;

  /**
   * There are 4 sizes for button: 40, 32, 28 and 24
   * Tertiary button can have 20 size.
   */
  @property({ type: Number }) size = DEFAULTS.SIZE;

  /**
   * There are 5 colors for button: positive, negative, accent, promotional, active.
   */
  @property({ type: String }) color = DEFAULTS.COLOR;

  /**
   * The tabindex of the button.
   */
  @property({ type: Number }) override tabIndex = 0;

  @state() private type = DEFAULTS.TYPE;

  constructor() {
    super();
    this.role = 'button';
  }

  public override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleClick);
    this.addEventListener('keydown', this.handleKeyDown);
    this.addEventListener('keyup', this.handleKeyUp);
    this.addEventListener('focus', this.handleFocus);
    this.addEventListener('blur', this.handleBlur);
  }

  public override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeyDown);
    this.removeEventListener('keyup', this.handleKeyUp);
    this.removeEventListener('focus', this.handleFocus);
    this.removeEventListener('blur', this.handleBlur);
  }

  public override update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.update(changedProperties);

    if (changedProperties.has('disabled')) {
      this.setDisabled(this, this.disabled);
    }
    if (changedProperties.has('softDisabled')) {
      this.setSoftDisabled(this, this.softDisabled);
    }
    if (changedProperties.has('arialabel')) {
      this.setAriaLabel(this, this.ariaLabel);
    }
    if (changedProperties.has('active')) {
      this.setAriaPressed(this, this.active);
    }
    if (changedProperties.has('size')) {
      this.setSize(this.size);
    }
    if (changedProperties.has('variant')) {
      this.setVariant(this.variant);
    }
    if (changedProperties.has('color')) {
      this.setColor(this.color);
    }
  }

  private setVariant(variant: string) {
    if (!Object.values(BUTTON_VARIANTS).includes(variant)) {
      this.setAttribute('variant', `${DEFAULTS.VARIANT}`);
    } else {
      this.setAttribute('variant', variant);
    }
  }

  private setSize(size: number) {
    const isIconType = this.type === 'icon';
    const isValidSize = isIconType
      ? isValidIconSize(size, this.variant)
      : isValidPillSize(size);

    if (!isValidSize) {
      this.setAttribute('size', `${DEFAULTS.SIZE}`);
    } else {
      this.setAttribute('size', `${size}`);
    }
  }

  private setColor(color: string) {
    if (!Object.values(BUTTON_COLORS).includes(color) || this.variant === 'tertiary') {
      this.setAttribute('color', `${DEFAULTS.COLOR}`);
    } else {
      this.setAttribute('color', color);
    }
  }

  private setAriaPressed(element: HTMLElement, active: boolean) {
    if (active) {
      element.setAttribute('aria-pressed', 'true');
    } else {
      element.removeAttribute('aria-pressed');
    }
  }

  private setAriaLabel(element: HTMLElement, ariaLabel: string) {
    if (ariaLabel) {
      element.setAttribute('aria-label', ariaLabel);
    } else {
      element.removeAttribute('aria-label');
    }
  }

  private setSoftDisabled(element: HTMLElement, softDisabled: boolean) {
    if (softDisabled) {
      element.setAttribute('soft-disabled', 'true');
      element.setAttribute('aria-disabled', 'true');
    } else {
      element.removeAttribute('soft-disabled');
      element.removeAttribute('aria-disabled');
    }
  }

  private prevTabindex = 0;

  private setDisabled(element: HTMLElement, disabled: boolean) {
    if (disabled) {
      element.setAttribute('disabled', 'true');
      element.setAttribute('aria-disabled', 'true');
      this.prevTabindex = this.tabIndex;
      this.tabIndex = -1;
      element.setAttribute('tabindex', `${this.tabIndex}`);
    } else {
      this.tabIndex = this.prevTabindex;
      element.removeAttribute('disabled');
      element.removeAttribute('aria-disabled');
      element.setAttribute('tabindex', `${this.tabIndex}`);
    }
  }

  private handleClick(event: MouseEvent) {
    if (!this.disabled && !this.softDisabled) {
      if (this.onclick) {
        this.onclick(event);
      }
    }
  }

  private handleFocus(event: FocusEvent) {
    if (this.softDisabled) {
      event.preventDefault();
    }
  }

  private handleBlur(event: FocusEvent) {
    if (this.softDisabled) {
      event.preventDefault();
    }
    this.classList.remove('pressed');
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!this.disabled && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.classList.add('pressed');
    }
  }

  private handleKeyUp(event: KeyboardEvent) {
    if (!this.disabled && (event.key === 'Enter' || event.key === ' ')) {
      this.handleClick(event as unknown as MouseEvent);
      this.classList.remove('pressed');
    }
  }

  private checkPrefixIconSlot(node: Array<Node>): boolean {
    if (
      node[0] instanceof HTMLElement && node[1] instanceof HTMLElement
      && node[0].nodeName === 'MDC-ICON' && node[1].nodeName === 'SPAN'
      && node[0].slot === 'prefix-icon' && node[1].slot === 'label-text'
    ) {
      return true;
    }
    return false;
  }

  private checkPostfixIconSlot(node: Array<Node>): boolean {
    if (
      node[0] instanceof HTMLElement && node[1] instanceof HTMLElement
      && node[0].nodeName === 'SPAN' && node[1].nodeName === 'MDC-ICON'
      && node[0].slot === 'label-text' && node[1].slot === 'prefix-icon'
    ) {
      return true;
    }
    return false;
  }

  private checkLabelTextSlot(node: Array<Node>): boolean {
    if (
      node[0] instanceof HTMLElement
      && node[0].nodeName === 'SPAN'
      && node[0].slot === 'label-text'
    ) {
      return true;
    }
    return false;
  }

  private assignSlotBasedOnChild(node: Array<Node>) {
    if (node.length === 1 && node[0] instanceof HTMLElement && node[0].nodeName === 'SPAN') {
      node[0].setAttribute('slot', 'label-text');
    } else if (
      node[0] instanceof HTMLElement && node[1] instanceof HTMLElement
    ) {
      if (node[0].nodeName === 'MDC-ICON' && node[1].nodeName === 'SPAN') {
        node[0].setAttribute('slot', 'prefix-icon');
        node[1].setAttribute('slot', 'label-text');
      } else if (node[0].nodeName === 'SPAN' && node[1].nodeName === 'MDC-ICON') {
        node[0].setAttribute('slot', 'label-text');
        node[1].setAttribute('slot', 'postfix-icon');
      }
    }
    return node;
  }

  public override render() {
    const filteredNodes = Array.from(this.childNodes).filter((node) => node.nodeType === Node.ELEMENT_NODE);
    const validNodes = filteredNodes.filter((node) => ['SPAN', 'MDC-ICON'].includes(node.nodeName));
    console.log(validNodes);
    console.log(`checkPrefixIconSlot => ${this.checkPrefixIconSlot(validNodes)}`);
    console.log(`checkPostfixIconSlot => ${this.checkPostfixIconSlot(validNodes)}`);
    console.log(`checkLabelTextSlot => ${this.checkLabelTextSlot(validNodes)}`);

    if (validNodes.length === 0) {
      return html``;
    }

    if ([
      this.checkPrefixIconSlot(validNodes),
      this.checkPostfixIconSlot(validNodes),
      this.checkLabelTextSlot(validNodes),
    ].some((isValid) => !!isValid)) {
      return validNodes;
    }

    return this.assignSlotBasedOnChild(validNodes);

    // return html`
    //   <slot name="prefix">${validNodes[1].outerHTML}</slot>
    //   <slot name="label-text"></slot>
    //   <slot name="postfix"></slot>
    // `;
  }

  public static override styles: Array<CSSResult> = [...Component.styles, ...styles];
}

export default Button;

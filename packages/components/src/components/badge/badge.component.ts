import { CSSResult, html, PropertyValues, TemplateResult } from 'lit';
import { classMap } from 'lit-html/directives/class-map.js';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { Component } from '../../models';
import { BADGE_TYPE, ICON_NAMES_LIST, DEFAULTS, ICON_VARIANT } from './badge.constants';
import styles from './badge.styles';

/**
 * A badge is a small, visually distinct element that provides additional information
 * or highlights the status of an item.
 * Badges are often used to display notification dot, counts, making them a useful tool for
 * conveying information quickly without taking up much space.
 * @dependency mdc-icon
 * @dependency mdc-text
 *
 * @tagname mdc-badge
 */
class Badge extends Component {
  /**
   * Type of the badge
   * Can be `dot` (notification) , `icon` and `counter`
   *
   * Default: `dot`
   */
  @property({ type: String, reflect: true })
  type = DEFAULTS.TYPE;

  /**
   * If `type` is set to `icon`, attribute `iconName` can
   * be used to choose which icon should be shown
   *
   * If no `iconName` is provided, no icon will be rendered.
   */
  @property({ type: String, attribute: 'icon-name' })
  iconName?: string;

  /**
   * badge variant
   */
  @property({ type: String })
  variant = DEFAULTS.VARIANT;

  @property({ type: Number })
  counter?: number;

  @property({ type: Number, attribute: 'max-counter' })
  maxCounter: number = DEFAULTS.MAX_COUNTER;

  @property({ type: Boolean })
  overlay = false;

  /**
   * Aria-label attribute to be set for accessibility
   */
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel: string | null = null;

  /**
   * If `type` is set to `counter` and if `counter` is greater than `maxCounter`,
   * then it will return a string the maxCounter value as string.
   * Otherwise, it will return a string representation of `counter`.
   * If `counter` is not a number, it will return an empty string.
   * @param maxCounter - the maximum limit which can be displayed on the badge
   * @param counter - the number to be displayed on the badge
   * @returns the string representation of the counter
   */
  private getCounterText(maxCounter: number, counter?: number): string {
    if (counter === undefined || typeof counter !== 'number') {
      return '';
    }
    if (counter > maxCounter) {
      return `${maxCounter}+`;
    }
    // At any given time, the max limit should not cross 999.
    if (counter > DEFAULTS.MAX_COUNTER_LIMIT) {
      return `${DEFAULTS.MAX_COUNTER_LIMIT}+`;
    }
    return counter.toString();
  }

  /**
   * Method to generate the badge icon template.
   * @param iconName - name of the icon to be used.
   * @param variant - variant of the badge.
   * @returns the template result of the icon.
   */
  private getBadgeIcon(
    iconName: string,
    overlay: boolean,
    iconVariant: string,
  ): TemplateResult {
    return html`
      <mdc-icon
        class="mdc-badge-icon ${classMap(this.getIconClasses(overlay, iconVariant))}"
        name="${ifDefined(iconName)}"
        length-unit="${DEFAULTS.LENGTH_UNIT}"
        size="${DEFAULTS.ICON_SIZE}"
      ></mdc-icon>
    `;
  }

  /**
   * Method to generate the badge dot template.
   * @param overlay - boolean indicating whether the badge should have an overlay.
   * @returns the template result of the dot with mdc-badge-dot class.
   */
  private getBadgeDot(overlay: boolean): TemplateResult {
    return html`<div class="mdc-badge-dot ${classMap({ 'mdc-badge-overlay': overlay })}"></div>`;
  }

  /**
   * This method generates the CSS classes for the badge icon.
   * @param overlay - boolean indicating whether the badge should have an overlay.
   * @param iconVariant - the variant of the icon badge.
   * @returns - an object containing the CSS classes for the icon.
   */
  private getIconClasses(overlay: boolean, iconVariant: string): { [key: string]: boolean } {
    const overLayClass = { 'mdc-badge-overlay': overlay };
    const iconVariantType = Object.values(ICON_VARIANT).includes(iconVariant)
      ? iconVariant : DEFAULTS.VARIANT;
    const backgroundClass = { [`mdc-badge-icon__${iconVariantType}`]: true };
    return {
      ...overLayClass,
      ...backgroundClass,
    };
  }

  /**
   * Method to generate the badge text and counter template.
   * @param maxCounter - the maximum limit which can be displayed on the badge
   * @param overlay - whether the badge should have an overlay.
   * @param counter - the number to be displayed on the badge
   * @returns the template result of the text.
   */
  private getBadgeCounterText(maxCounter: number, overlay: boolean, counter?: number): TemplateResult {
    return html`
      <mdc-text
        type="body-small-medium"
        tagname="div"
        class="mdc-badge-text ${classMap({ 'mdc-badge-overlay': overlay })}"
      >
        ${this.getCounterText(maxCounter, counter)}
      </mdc-text>
    `;
  }

  private setRoleByAriaLabel(): void {
    if (this.ariaLabel) {
      this.role = 'img';
    } else {
      this.role = null;
    }
  }

  private getBadgeContentBasedOnType(): TemplateResult {
    const { counter, iconName, maxCounter, overlay, type, variant } = this;
    switch (type) {
      case BADGE_TYPE.DOT:
        return this.getBadgeDot(overlay);
      case BADGE_TYPE.ICON:
        return this.getBadgeIcon(iconName || '', overlay, variant);
      case BADGE_TYPE.COUNTER:
        return this.getBadgeCounterText(maxCounter, overlay, counter);
      case BADGE_TYPE.SUCCESS:
        return this.getBadgeIcon(ICON_NAMES_LIST.SUCCESS_ICON_NAME, overlay, ICON_VARIANT.SUCCESS);
      case BADGE_TYPE.WARNING:
        return this.getBadgeIcon(ICON_NAMES_LIST.WARNING_ICON_NAME, overlay, ICON_VARIANT.WARNING);
      case BADGE_TYPE.ERROR:
        return this.getBadgeIcon(ICON_NAMES_LIST.ERROR_ICON_NAME, overlay, ICON_VARIANT.ERROR);
      default:
        return html``;
    }
  }

  public override update(changedProperties: PropertyValues): void {
    super.update(changedProperties);

    if (changedProperties.has('ariaLabel')) {
      this.setRoleByAriaLabel();
    }
  }

  public override render() {
    return this.getBadgeContentBasedOnType();
  }

  public static override styles: Array<CSSResult> = [...Component.styles, ...styles];
}

export default Badge;

import { CSSResult, html, nothing, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { Component } from '../../models';
import { BUTTON_VARIANTS } from '../button/button.constants';
import { TYPE, VALID_TEXT_TAGS } from '../text/text.constants';
import { ROLE } from '../../utils/roles';

import styles from './accordionitem.styles';
import { DEFAULTS, ICON_NAME } from './accordionitem.constants';
import type { Variant } from './accordionitem.types';

/**
 * accordionitem component, which ...
 *
 * @dependency mdc-button
 * @dependency mdc-text
 *
 * @tagname mdc-accordionitem
 *
 * @slot default - This is a default/unnamed slot
 *
 * @event click - (React: onClick) This event is a Click Event, update the description
 */
class AccordionItem extends Component {
  /**
   * The visibility of the accordion item.
   * @default false
   */
  @property({ type: Boolean, reflect: true }) visible: boolean = DEFAULTS.VISIBLE;

  /**
   * The header text of the accordion item.
   */
  @property({ type: String, reflect: true, attribute: 'header-text' }) headerText?: string;

  /**
   * The variant of the accordion item.
   * @default 'default'
   */
  @property({ type: String, reflect: true }) variant: Variant = DEFAULTS.VARIANT;

  override connectedCallback(): void {
    super.connectedCallback();
  }

  private handleHeaderClick(): void {
    this.visible = !this.visible;
  }

  private renderHeader(): TemplateResult {
    return html`
      <div part="header-section" @click="${this.handleHeaderClick}" role="${ROLE.HEADING}">
        <div part="leading">
          <mdc-text type="${TYPE.BODY_LARGE_REGULAR}" tagname=${VALID_TEXT_TAGS.DIV}>${this.headerText}</mdc-text>
        </div>
        <div part="trailing">
          <mdc-button
            variant="${BUTTON_VARIANTS.TERTIARY}"
            size="32"
            prefix-icon=${this.visible ? ICON_NAME.ARROW_UP : ICON_NAME.ARROW_DOWN}
            aria-expanded="${this.visible}"
          ></mdc-button>
        </div>
      </div>
    `;
  }

  public override render() {
    return html`
      ${this.renderHeader()}
      ${this.visible ? html`<div part="body-section" role="${ROLE.REGION}"><slot></slot></div>` : nothing}
    `;
  }

  public static override styles: Array<CSSResult> = [...Component.styles, ...styles];
}

export default AccordionItem;

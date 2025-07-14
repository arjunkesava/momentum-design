import { CSSResult, html, nothing, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';

import { Component } from '../../models';
import { KEYS } from '../../utils/keys';
import { DisabledMixin } from '../../utils/mixins/DisabledMixin';
import { ROLE } from '../../utils/roles';
import { Size } from '../accordion/accordion.types';
import { BUTTON_VARIANTS } from '../button/button.constants';
import { TYPE, VALID_TEXT_TAGS } from '../text/text.constants';

import { DEFAULTS, ICON_NAME } from './accordionitem.constants';
import styles from './accordionitem.styles';

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
class AccordionItem extends DisabledMixin(Component) {
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
   * The size of the accordion item.
   * @default 'small'
   */
  @property({ type: String, reflect: true }) size: Size = DEFAULTS.SIZE;

  private handleHeaderClick(): void {
    console.log('header clicked');
    this.visible = !this.visible;
    // const event = new CustomEvent('accordion-item-header-clicked', {
    //   bubbles: true,
    //   composed: true,
    // });
    // this.dispatchEvent(event);
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === KEYS.ENTER || event.key === KEYS.SPACE) {
      this.handleHeaderClick();
    }
  }

  private renderHeader(): TemplateResult {
    return html`
      <div
        part="header-section"
        class="mdc-focus-ring"
        @click="${this.handleHeaderClick}"
        @keydown="${this.handleKeyDown}"
        role="${ROLE.HEADING}"
        tabindex="${this.disabled ? -1 : 0}"
      >
        <div part="leading">
          <mdc-text type="${TYPE.BODY_LARGE_REGULAR}" tagname=${VALID_TEXT_TAGS.DIV}>${this.headerText}</mdc-text>
        </div>
        <div part="trailing">
          <mdc-button
            variant="${BUTTON_VARIANTS.TERTIARY}"
            prefix-icon=${this.visible ? ICON_NAME.ARROW_UP : ICON_NAME.ARROW_DOWN}
            aria-expanded="${this.visible}"
            tabindex="-1"
            ?disabled="${this.disabled}"
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

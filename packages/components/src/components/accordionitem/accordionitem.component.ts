import { CSSResult, html, nothing, TemplateResult } from 'lit';
import { v4 as uuidv4 } from 'uuid';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { Component } from '../../models';
import { KEYS } from '../../utils/keys';
import { DisabledMixin } from '../../utils/mixins/DisabledMixin';
import { ROLE } from '../../utils/roles';
import { Size } from '../accordion/accordion.types';
import { IconNames } from '../icon/icon.types';
import { TYPE, VALID_TEXT_TAGS } from '../text/text.constants';

import { DEFAULTS, ICON_NAME } from './accordionitem.constants';
import styles from './accordionitem.styles';

/**
 * accordionitem component, which ...
 *
 * @dependency mdc-text
 * @dependency mdc-chip
 * @dependency mdc-icon
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

  /**
   * The leading icon that is displayed before the header text.
   */
  @property({ type: String, attribute: 'leading-icon' }) leadingIcon?: IconNames;

  /**
   * The leading chip's label text that is displayed after the header text.
   */
  @property({ type: String, attribute: 'leading-label' }) leadingLabel?: string;

  /**
   * The trailing chip's label text.
   */
  @property({ type: String, attribute: 'trailing-label' }) trailingLabel?: string;

  /** @internal */
  private headSectionId = `head-section-${uuidv4()}`;

  /** @internal */
  private bodySectionId = `body-section-${uuidv4()}`;

  private handleHeaderClick(): void {
    this.visible = !this.visible;
    const event = new CustomEvent('header-click', {
      bubbles: true,
      cancelable: true,
    });
    this.dispatchEvent(event);
  }

  private handleKeyDown(event: KeyboardEvent): void {
    if (event.key === KEYS.ENTER || event.key === KEYS.SPACE) {
      this.handleHeaderClick();
    }
  }

  private renderLabel(label?: string): TemplateResult | typeof nothing {
    return label ? html`<mdc-chip tabindex="-1" label="${ifDefined(label)}"></mdc-chip>` : nothing;
  }

  private renderIcon(iconName?: IconNames): TemplateResult | typeof nothing {
    return iconName ? html`<mdc-icon tabindex="-1" name="${ifDefined(iconName)}"></mdc-icon>` : nothing;
  }

  private renderHeadingText(): TemplateResult | typeof nothing {
    return this.headerText
      ? html`<mdc-text
          tabindex="-1"
          id="${this.headSectionId}"
          aria-controls="${this.bodySectionId}"
          aria-expanded="${!!this.visible}"
          role="${ROLE.BUTTON}"
          type="${TYPE.BODY_LARGE_REGULAR}"
          tagname=${VALID_TEXT_TAGS.SPAN}
          >${this.headerText}</mdc-text
        >`
      : nothing;
  }

  private renderHeader(): TemplateResult {
    return html`
      <div
        part="header-section"
        class="mdc-focus-ring"
        @click="${this.handleHeaderClick}"
        @keydown="${this.handleKeyDown}"
        role="${ROLE.HEADING}"
        aria-level="3"
        tabindex="${this.disabled ? -1 : 0}"
      >
        <div part="leading-header">
          ${this.renderIcon(this.leadingIcon)} ${this.renderHeadingText()} ${this.renderLabel(this.leadingLabel)}
          <slot name="leading-header"></slot>
        </div>
        <div part="trailing-header">
          ${this.renderLabel(this.trailingLabel)}
          <slot name="trailing-header"></slot>
          ${this.renderIcon(this.visible ? ICON_NAME.ARROW_UP : ICON_NAME.ARROW_DOWN)}
        </div>
      </div>
    `;
  }

  private renderBody(): TemplateResult | typeof nothing {
    if (this.visible) {
      return html`<div
        id="${this.bodySectionId}"
        aria-labelledby="${this.headSectionId}"
        part="body-section"
        role="${ROLE.REGION}"
      >
        <slot></slot>
      </div>`;
    }
    return nothing;
  }

  public override render() {
    return html` ${this.renderHeader()} ${this.renderBody()} `;
  }

  public static override styles: Array<CSSResult> = [...Component.styles, ...styles];
}

export default AccordionItem;

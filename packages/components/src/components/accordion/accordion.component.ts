import type { CSSResult, PropertyValues } from 'lit';
import { html } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';

import { Component } from '../../models';
import { TAG_NAME as ACCORDIONITEM_TAGNAME } from '../accordionitem/accordionitem.constants';

import styles from './accordion.styles';
import { DEFAULTS } from './accordion.constants';
import type { Size, Variant } from './accordion.types';

/**
 * accordion component, which ...
 *
 * @tagname mdc-accordion
 *
 * @slot default - This is a default/unnamed slot
 *
 * @event header-click - (React: onClick) This event is a Click Event, update the description
 */
class Accordion extends Component {
  /**
   * If true, multiple accordion items can be expanded at the same time.
   *
   * @default false
   */
  @property({ type: Boolean, reflect: true, attribute: 'allow-multiple' }) allowMultiple = false;

  /**
   * The variant of the accordion.
   * @default 'stacked'
   */
  @property({ type: String, reflect: true }) variant: Variant = DEFAULTS.VARIANT;

  /**
   * The size of the accordion.
   * @default 'small'
   */
  @property({ type: String, reflect: true }) size: Size = DEFAULTS.SIZE;

  /**
   * A list of accordion item elements assigned to the default slot.
   *
   * @internal
   */
  @queryAssignedElements({ selector: ACCORDIONITEM_TAGNAME })
  accordionItems!: Array<HTMLElement>;

  constructor() {
    super();
    this.addEventListener('header-click', (event: Event) => this.onAccordionItemHeaderClick(event));
  }

  /**
   * Handles the accordion item header click event.
   * Closes other accordion items if allowMultiple is false.
   *
   * @param event - The event object from the click event.
   */
  private onAccordionItemHeaderClick(event: Event) {
    if (this.allowMultiple) {
      return;
    }
    this.accordionItems.forEach(accordionItem => {
      if (accordionItem !== event.target && accordionItem.hasAttribute('visible')) {
        accordionItem.toggleAttribute('visible');
      }
    });
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);

    if (changedProperties.has('size')) {
      this.accordionItems.forEach(accordionItem => {
        accordionItem.setAttribute('size', this.size);
      });
    }
  }

  public override render() {
    return html` <slot></slot>`;
  }

  public static override styles: Array<CSSResult> = [...Component.styles, ...styles];
}

export default Accordion;

import { CSSResult, html } from 'lit';

import { Component } from '../../models';

import styles from './accordionitem.styles';

/**
 * accordionitem component, which ...
 *
 * @tagname mdc-accordionitem
 *
 * @slot default - This is a default/unnamed slot
 *
 * @event click - (React: onClick) This event is a Click Event, update the description
 *
 * @cssproperty --custom-property-name - Description of the CSS custom property
 */
class AccordionItem extends Component {
  public override render() {
    return html`<p>This is a dummy accordionitem component!</p>
      <slot></slot>`;
  }

  public static override styles: Array<CSSResult> = [...Component.styles, ...styles];
}

export default AccordionItem;

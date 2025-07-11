import AccordionItem from './accordionitem.component';
import { TAG_NAME } from './accordionitem.constants';

AccordionItem.register(TAG_NAME);

declare global {
  interface HTMLElementTagNameMap {
    ['mdc-accordionitem']: AccordionItem;
  }
}

export default AccordionItem;

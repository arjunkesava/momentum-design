import { css } from 'lit';

const styles = css`
  :host {
    --mdc-accordion-border-color: var(--mds-color-theme-outline-secondary-normal);

    display: flex;
    flex-direction: column;
  }
  :host([variant='contained']) {
    border: 1px dashed var(--mdc-accordion-border-color);
    border-radius: 0.5rem;
  }
  :host([variant='borderless']) {
    border: none;
  }
  :host([variant='stacked']) {
    row-gap: 1.5rem;
  }
  :host([variant='stacked']) ::slotted(mdc-accordionitem) {
    border: 1px solid var(--mdc-accordion-border-color);
    border-radius: 0.5rem;
  }

  :host([variant='borderless']) ::slotted(mdc-accordionitem) {
    border-radius: 0;
  }

  :host([variant='borderless']) ::slotted(mdc-accordionitem),
  :host([variant='contained']) ::slotted(mdc-accordionitem) {
    border-bottom: 1px solid var(--mdc-accordion-border-color);
  }

  :host([variant='contained']) ::slotted(mdc-accordionitem:last-child) {
    border-bottom: none;
  }
`;
export default [styles];

import { css } from 'lit';

import { hostFitContentStyles } from '../../utils/styles';

const styles = [
  hostFitContentStyles,
  css`
    :host {
      --mdc-accordionitem-border-color: var(--mds-color-theme-outline-secondary-normal);

      border: 1px solid var(--mdc-accordionitem-border-color);
      border-radius: 0.5rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;
    }

    :host([variant='borderless']) {
      border: none;
    }

    :host::part(header-section) {
      border-bottom: 1px solid var(--mdc-accordionitem-border-color);
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    :host(:not([visible]))::part(header-section) {
      border-bottom: none;
    }

    :host::part(header-section),
    :host::part(body-section) {
      padding: 1.5rem;
    }
  `,
];

export default styles;

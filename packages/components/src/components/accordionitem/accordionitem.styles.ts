import { css } from 'lit';

import { hostFitContentStyles } from '../../utils/styles';

const styles = [
  hostFitContentStyles,
  css`
    :host {
      --mdc-accordionitem-border-color: var(--mds-color-theme-outline-secondary-normal);

      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;
    }

    :host::part(header-section) {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    :host([visible])::part(header-section) {
      border-bottom: 1px solid var(--mdc-accordionitem-border-color);
    }

    :host([size='small'])::part(header-section),
    :host([size='small'])::part(body-section) {
      padding: 1rem;
    }

    :host([size='large'])::part(header-section),
    :host([size='large'])::part(body-section) {
      padding: 1.5rem;
    }
  `,
];

export default styles;

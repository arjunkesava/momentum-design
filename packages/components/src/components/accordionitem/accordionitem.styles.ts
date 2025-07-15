import { css } from 'lit';

import { hostFitContentStyles, hostFocusRingStyles } from '../../utils/styles';

const styles = [
  hostFitContentStyles,
  css`
    :host {
      --mdc-accordionitem-border-color: var(--mds-color-theme-outline-secondary-normal);
      --mdc-accordionitem-hover-color: var(--mds-color-theme-background-primary-hover);
      --mdc-accordionitem-active-color: var(--mds-color-theme-background-primary-active);
      --mdc-accordionitem-disabled-color: var(--mds-color-theme-text-primary-disabled);

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
      cursor: pointer;
      user-select: none;
    }

    :host::part(body-section) {
      width: 100%;
    }

    :host(:not([visible]))::part(header-section) {
      border-radius: 0.5rem;
    }

    :host([visible])::part(header-section) {
      border-radius: 0.5rem 0.5rem 0 0;
    }

    :host::part(header-section):hover {
      background-color: var(--mdc-accordionitem-hover-color);
    }

    :host::part(header-section):active {
      background-color: var(--mdc-accordionitem-active-color);
    }

    :host([disabled])::part(header-section) {
      color: var(--mdc-accordionitem-disabled-color);
    }

    :host([disabled])::part(header-section):active,
    :host([disabled])::part(header-section):hover {
      background-color: unset;
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

    :host::part(leading-header),
    :host::part(trailing-header) {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;
      align-items: center;
    }
  `,
  ...hostFocusRingStyles(true),
];

export default styles;

import type { Meta, StoryObj, Args } from '@storybook/web-components';
import '.';
import { html } from 'lit';
import '../accordionitem';
import '../checkbox';
import '../button';
import '../input';

import { classArgType, styleArgType } from '../../../config/storybook/commonArgTypes';

import { SIZE, VARIANT } from './accordion.constants';

const render = (args: Args) =>
  html`<div style="width: 35rem">
    <mdc-accordion variant=${args.variant} size=${args.size} ?allow-multiple=${args['allow-multiple']}>
      <mdc-accordionitem header-text="Heading 1" visible>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. <mdc-button>Button</mdc-button> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
        officia deserunt mollit anim id est laborum.
      </mdc-accordionitem>
      <mdc-accordionitem header-text="Heading 2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </mdc-accordionitem>
      <mdc-accordionitem header-text="Heading 3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </mdc-accordionitem>
    </mdc-accordion>
  </div>`;

const meta: Meta = {
  title: 'Work In Progress/accordion/accordion',
  tags: ['autodocs'],
  component: 'mdc-accordion',
  render,
  parameters: {
    badges: ['wip'],
  },
  argTypes: {
    ...classArgType,
    ...styleArgType,
    'allow-multiple': {
      control: 'boolean',
    },
    variant: {
      control: 'select',
      options: Object.values(VARIANT),
    },
    size: {
      control: 'select',
      options: Object.values(SIZE),
    },
  },
};

export default meta;

export const Example: StoryObj = {
  args: {
    variant: VARIANT.STACKED,
    size: SIZE.SMALL,
    'allow-multiple': true,
  },
};

export const ContainedAccordion: StoryObj = {
  args: {
    variant: VARIANT.CONTAINED,
    size: SIZE.SMALL,
    'allow-multiple': true,
  },
  render: args => html`
    <mdc-accordion
      variant="${args.variant}"
      size="${args.size}"
      ?allow-multiple="${args['allow-multiple']}"
      style="width: 20rem;"
    >
      <mdc-accordionitem header-text="Brand" visible leading-label="Popular" leading-icon="block-quote-bold">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <mdc-checkbox checked label="Apple"></mdc-checkbox>
          <mdc-checkbox label="Samsung"></mdc-checkbox>
          <mdc-checkbox label="Google"></mdc-checkbox>
          <mdc-checkbox label="Nokia"></mdc-checkbox>
        </div>
      </mdc-accordionitem>
      <mdc-accordionitem header-text="RAM">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <mdc-checkbox label="4 GB"></mdc-checkbox>
          <mdc-checkbox label="8 GB"></mdc-checkbox>
          <mdc-checkbox label="12 GB"></mdc-checkbox>
        </div>
      </mdc-accordionitem>
      <mdc-accordionitem header-text="Network Type" disabled>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <mdc-checkbox label="3G"></mdc-checkbox>
          <mdc-checkbox label="4G"></mdc-checkbox>
          <mdc-checkbox label="5G"></mdc-checkbox>
        </div>
      </mdc-accordionitem>
      <mdc-accordionitem header-text="Discount">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <mdc-checkbox label="50% or more"></mdc-checkbox>
          <mdc-checkbox label="40% or more"></mdc-checkbox>
          <mdc-checkbox label="30% or more"></mdc-checkbox>
          <mdc-checkbox label="20% or more"></mdc-checkbox>
          <mdc-checkbox label="10% or more"></mdc-checkbox>
        </div>
      </mdc-accordionitem>
    </mdc-accordion>
  `,
};

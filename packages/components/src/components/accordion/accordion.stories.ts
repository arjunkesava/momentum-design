import type { Meta, StoryObj, Args } from '@storybook/web-components';
import '.';
import { html } from 'lit';
import '../accordionitem';

import { classArgType, styleArgType } from '../../../config/storybook/commonArgTypes';

import { SIZE, VARIANT } from './accordion.constants';

const render = (args: Args) =>
  html`<div style="width: 35rem">
    <mdc-accordion variant=${args.variant} size=${args.size}>
      <mdc-accordionitem header-text="Heading 1" visible>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
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
    class: 'custom-classname',
    style: 'margin-top: 20px;',
    variant: VARIANT.STACKED,
    size: SIZE.SMALL,
  },
};

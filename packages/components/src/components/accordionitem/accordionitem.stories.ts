import type { Args, Meta, StoryObj } from '@storybook/web-components';
import '.';
import { html } from 'lit';

import { classArgType, styleArgType } from '../../../config/storybook/commonArgTypes';

import { VARIANT } from './accordionitem.constants';

const render = (args: Args) =>
  html`<div style="width: 25rem;">
    <mdc-accordionitem header-text=${args['header-text']} ?visible=${args.visible} variant=${args.variant}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    </mdc-accordionitem>
  </div>`;

const meta: Meta = {
  title: 'Work In Progress/accordion/accordionitem',
  tags: ['autodocs'],
  component: 'mdc-accordionitem',
  render,
  parameters: {
    badges: ['wip'],
  },
  argTypes: {
    ...classArgType,
    ...styleArgType,
    visible: {
      control: 'boolean',
    },
    'header-text': {
      control: 'text',
    },
    variant: {
      control: 'select',
      options: Object.values(VARIANT),
    },
  },
};

export default meta;

export const Example: StoryObj = {
  args: {
    class: 'custom-classname',
    style: 'margin-top: 20px;',
    'header-text': 'Heading',
    visible: true,
    variant: VARIANT.DEFAULT,
  },
};

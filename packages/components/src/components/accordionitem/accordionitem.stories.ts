import type { Args, Meta, StoryObj } from '@storybook/web-components';
import { action } from '@storybook/addon-actions';
import '.';
import { html } from 'lit';
import '../badge';
import '../accordion';
import '../avatar';

import { classArgType, styleArgType } from '../../../config/storybook/commonArgTypes';
import { SIZE } from '../accordion/accordion.constants';

const defaultChildren = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."`;

const render = (args: Args) =>
  html`<div style="width: 25rem;">
    <mdc-accordionitem
      @header-click="${action('header-click')}"
      ?disabled=${args.disabled}
      ?visible=${args.visible}
      header-text=${args['header-text']}
      leading-icon=${args['leading-icon']}
      leading-label=${args['leading-label']}
      size=${args.size}
      trailing-label=${args['trailing-label']}
      variant=${args.variant}
    >
      ${defaultChildren}
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
    size: {
      control: 'select',
      options: Object.values(SIZE),
    },
    disabled: {
      control: 'boolean',
    },
    'leading-icon': {
      control: 'text',
    },
    'leading-label': {
      control: 'text',
    },
    'trailing-label': {
      control: 'text',
    },
  },
};

export default meta;

export const Example: StoryObj = {
  args: {
    'header-text': 'Heading',
    'leading-icon': '',
    'leading-label': '',
    'trailing-label': '',
    disabled: false,
    size: SIZE.SMALL,
    visible: true,
  },
};

export const BadgeHeading: StoryObj = {
  render: () => html`
    <mdc-accordion>
      <mdc-accordionitem header-text="Recent Updates">
        <mdc-badge slot="leading-header" type="counter" counter="258" max-counter="999"></mdc-badge>
        <mdc-avatar slot="trailing-header" initials="AS" src="https://picsum.photos/id/68/128"></mdc-avatar>
        ${defaultChildren}
      </mdc-accordionitem>
    </mdc-accordion>
  `,
};

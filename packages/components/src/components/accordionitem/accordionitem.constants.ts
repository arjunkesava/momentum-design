import utils from '../../utils/tag-name';
import type { IconNames } from '../icon/icon.types';

const TAG_NAME = utils.constructTagName('accordionitem');

const ICON_NAME = {
  ARROW_UP: 'arrow-up-bold' as Extract<IconNames, 'arrow-up-bold'>,
  ARROW_DOWN: 'arrow-down-bold' as Extract<IconNames, 'arrow-down-bold'>,
} as const;

const VARIANT = {
  DEFAULT: 'default',
  BORDERLESS: 'borderless',
} as const;

const DEFAULTS = {
  VISIBLE: false,
  VARIANT: VARIANT.DEFAULT,
  ICON_NAME: ICON_NAME.ARROW_UP,
};

export { TAG_NAME, ICON_NAME, VARIANT, DEFAULTS };

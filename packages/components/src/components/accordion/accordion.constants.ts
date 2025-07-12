import utils from '../../utils/tag-name';

const TAG_NAME = utils.constructTagName('accordion');

const VARIANT = {
  BORDERLESS: 'borderless',
  CONTAINED: 'contained',
  STACKED: 'stacked',
} as const;

const SIZE = {
  SMALL: 'small',
  LARGE: 'large',
} as const;

const DEFAULTS = {
  VARIANT: VARIANT.STACKED,
  SIZE: SIZE.SMALL,
};

export { TAG_NAME, VARIANT, SIZE, DEFAULTS };

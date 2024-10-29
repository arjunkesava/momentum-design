import utils from '../../utils/tag-name';

const TAG_NAME = utils.constructTagName('badge');

const BADGE_TYPE = {
  DOT: 'dot',
  ICON: 'icon',
  COUNTER: 'counter',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

const ICON_NAMES_LIST = {
  SUCCESS_ICON_NAME: 'check-circle-filled',
  WARNING_ICON_NAME: 'warning-filled',
  ERROR_ICON_NAME: 'error-legacy-filled',
};

const ICON_VARIANT = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

const DEFAULTS = {
  TYPE: BADGE_TYPE.COUNTER,
  LENGTH_UNIT: 'rem',
  MAX_COUNTER: 99999,
  MAX_COUNTER_LIMIT: 999,
  VARIANT: ICON_VARIANT.PRIMARY,
  ICON_SIZE: 1,
};

export {
  TAG_NAME,
  DEFAULTS,
  BADGE_TYPE,
  ICON_VARIANT,
  ICON_NAMES_LIST,
};

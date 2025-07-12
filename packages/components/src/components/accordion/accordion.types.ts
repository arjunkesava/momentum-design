import type { ValueOf } from '../../utils/types';

import { SIZE, VARIANT } from './accordion.constants';

type Size = ValueOf<typeof SIZE>;
type Variant = ValueOf<typeof VARIANT>;

export type { Size, Variant };

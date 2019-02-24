import { PetEffects } from './pet';
import { UIEffects } from './ui';
import { UserEffects } from './user';

export const MODULES_EFFECTS = [
  PetEffects,
  UserEffects,
  UIEffects,
]

export * from './app';
export * from './pet';
export * from './ui';
export * from './user';


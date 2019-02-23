import { PetEffects, PetService } from './pet';
import { UserEffects, UserService } from './user';

export const MODULES_PROVIDERS = [
  PetService,
  UserService,
];

export const MODULES_EFFECTS = [
  PetEffects,
  UserEffects,
]

export * from './app';
export * from './pet';
export * from './user';


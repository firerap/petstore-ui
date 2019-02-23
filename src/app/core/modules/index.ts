import { PetEffects, PetService } from './pet';

export const MODULES_PROVIDERS = [
  PetService,
];

export const MODULES_EFFECTS = [
  PetEffects,
]

export * from './app';
export * from './pet';


import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable()
export class PetService {
  fetchPets() {
    return of([]);
  }
}

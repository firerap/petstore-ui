import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPet, IPetStatus } from '../../models';

@Injectable({ providedIn: 'root' })
export class PetService {
  constructor(private http: HttpClient) { }

  fetchPets(status: IPetStatus) {
    return this.http.get<IPet[]>(`https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`);
  }

  addPet(pet: IPet) {
    return this.http.post<IPet>(`https://petstore.swagger.io/v2/pet/`, pet);
  }

  deletePet(id: number) {
    return this.http.delete<void>(`https://petstore.swagger.io/v2/pet/${id}/`);
  }
}

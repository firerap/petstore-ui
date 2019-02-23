import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPet, IPetStatus } from '../../models';

@Injectable()
export class PetService {
  constructor(private http: HttpClient) { }

  fetchPets(status: IPetStatus) {
    return this.http.get<IPet[]>(`https://petstore.swagger.io/v2/pet/findByStatus?status=${status}`);
  }
}

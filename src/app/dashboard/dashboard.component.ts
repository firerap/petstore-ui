import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { skip, takeUntil } from 'rxjs/operators';
import { BaseComponent, IAppState, IPet, ModalActions, PetActions } from '../core';
import { DeletePetModalComponent, DeletePetModalData, NewPetModalComponent, NewPetModalData } from './modals';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  public dataSource: MatTableDataSource<IPet> = new MatTableDataSource();
  public displayedColumns = ['name', 'category', 'status', 'id', 'controls'];
  public pets: IPet[] = [];
  public isLoading: boolean = true;

  constructor(
    private store: Store<IAppState>,
  ) {
    super();
  }

  ngOnInit() {
    this.initPets();
  }

  public trackByFn(i: number, item: IPet) {
    return item.id;
  }

  public handleAddPet() {
    this.store.dispatch(new ModalActions.OpenAction<NewPetModalData>({
      cmpType: NewPetModalComponent,
      props: {
        modalName: 'new-pet-modal',
      },
      modalOptions: {
        disableClose: false,
      }
    }));
  }

  public handleDeletePet(pet: IPet, e: Event) {
    e.preventDefault();
    this.store.dispatch(new ModalActions.OpenAction<DeletePetModalData>({
      cmpType: DeletePetModalComponent,
      props: {
        modalName: 'delete-pet-modal',
        pet,
      },
      modalOptions: {
        disableClose: false,
      }
    }));
  }

  private initPets() {
    this.store.pipe(
      select(s => s.pet.pets),
      skip(1),
      takeUntil(this.destroy$),
    ).subscribe(pets => {
      this.pets = pets;
      this.prepareDataSource(pets);
      this.isLoading = false;
    });

    this.isLoading = true;
    this.store.dispatch(new PetActions.FetchAction());
  }

  private prepareDataSource(pets: IPet[]) {
    this.dataSource.data = pets.slice();
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { skip, takeUntil } from 'rxjs/operators';
import { BaseComponent, IAppState, IPet, PetActions } from '../core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
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
    this.dataSource.data = [...pets];
    // this.dataSource.sort = this.sort;
  }
}

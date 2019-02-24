import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { skip, take, takeUntil } from 'rxjs/operators';
import { BaseComponent, IAppState, IPet, ModalActions, PetActions } from '../../../core';

export interface DeletePetModalData {
  modalName: string;
  pet: IPet;
}

@Component({
  selector: 'app-delete-pet-modal',
  templateUrl: './delete-pet-modal.component.html',
  styleUrls: ['./delete-pet-modal.component.scss']
})
export class DeletePetModalComponent extends BaseComponent {
  public isLoading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeletePetModalData,
    private store: Store<IAppState>,
  ) {
    super();
  }

  public deletePet() {
    this.store.pipe(
      select(s => s.pet.pets),
      skip(1),
      take(1),
      takeUntil(this.destroy$),
    ).subscribe(_ => {
      this.isLoading = false;
      this.close();
    });

    this.isLoading = true;
    this.store.dispatch(new PetActions.DeleteAction(this.data.pet.id));
  }

  public close() {
    this.store.dispatch(new ModalActions.CloseAction({
      modalName: this.data.modalName,
      message: 'Delete success',
    }));
  }
}

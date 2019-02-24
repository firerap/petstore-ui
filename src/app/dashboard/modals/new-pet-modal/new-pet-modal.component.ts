import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { skip, take, takeUntil } from 'rxjs/operators';
import { BaseComponent, IAppState, IPet, IPetStatus, ModalActions, PetActions } from '../../../core';

export interface NewPetModalData {
  modalName: string;
}

@Component({
  selector: 'app-new-pet-modal',
  templateUrl: './new-pet-modal.component.html',
  styleUrls: ['./new-pet-modal.component.scss']
})
export class NewPetModalComponent extends BaseComponent {
  public isLoading: boolean = false;
  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NewPetModalData,
    private store: Store<IAppState>,
    private fb: FormBuilder,
  ) {
    super();
    this.initForm();
  }

  public addPet() {
    if (this.form.invalid) {
      return false;
    }

    const newPet: IPet = {
      category: {
        id: 0,
        name: "string"
      },
      name: this.form.get('name').value,
      photoUrls: [],
      status: IPetStatus.PENDING
    };

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
    this.store.dispatch(new PetActions.CreateAction(newPet));
  }

  public close() {
    this.store.dispatch(new ModalActions.CloseAction({
      modalName: this.data.modalName,
      message: 'Add success',
    }));
  }

  private initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
    })
  }
}

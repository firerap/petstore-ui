import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, takeUntil } from 'rxjs/operators';
import { BaseComponent, IAppState, IUser, UserActions } from '../core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent extends BaseComponent implements OnInit {
  public isLoading: boolean = false;
  public form: FormGroup;

  constructor(
    private router: Router,
    private store: Store<IAppState>,
    private fb: FormBuilder,
  ) {
    super();
    this.initForm();
  }

  ngOnInit() {
    this.store.dispatch(new UserActions.LogoutAction());
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.store.pipe(
      select(s => s.user.current),
      filter(_ => !!_),
      takeUntil(this.destroy$),
    ).subscribe(user => {
      this.isLoading = false;
      this.router.navigate(['/dashboard']);
    });

    const { email, password } = this.form.value;

    const user: IUser = {
      username: email,
      email,
      password,
    }

    this.isLoading = true;
    this.store.dispatch(new UserActions.CreateAction(user));
  }

  private initForm() {
    this.form = this.fb.group({
      email: ['test@test.test', [Validators.required, Validators.email]],
      password: ['test', [Validators.required]]
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { LogIn } from 'src/app/store/actions/auth.action';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})

export class LoginDialogComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  login() {
    if (this.loginForm.valid) {
      this.store.dispatch(new LogIn(this.loginForm.value));
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.states';
import { MatDialogRef } from '@angular/material';
import { SignUp } from 'src/app/store/actions/auth.action';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss']
})
export class RegistrationDialogComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RegistrationDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  closeDialog(e): void {
    e.preventDefault();
    this.dialogRef.close();
  }

  registration() {
    if (this.registrationForm.valid) {
      this.store.dispatch(new SignUp(this.registrationForm.value));
    }
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})

export class LoginDialogComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    private formBuilder: FormBuilder
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  login() {
    console.log(this.loginForm);
    if (this.loginForm.valid) {

      this.dialogRef.close();
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

}

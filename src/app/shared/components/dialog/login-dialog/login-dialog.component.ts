import { Component, OnInit, Inject } from '@angular/core';
import {FormControl, Validators, NgForm} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})

export class LoginDialogComponent implements OnInit {

  nameFormControl = new FormControl('', [
    Validators.required,
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitForm(form: NgForm) {
    // tslint:disable-next-line:max-line-length
    console.log('name: ' + this.nameFormControl.value + '\nemail: ' + this.emailFormControl.value + ';\npassword: ' + this.passwordFormControl.value);
  }

  ngOnInit() {
  }

}

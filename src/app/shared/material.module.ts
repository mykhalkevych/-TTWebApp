import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatInputModule,
  MatDialogRef
} from '@angular/material';

const MATERIAL_COMPONENTS = [
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatInputModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MATERIAL_COMPONENTS
  ],
  exports: [
    ...MATERIAL_COMPONENTS
  ],
  providers: [{ provide: MatDialogRef, useValue: {} }]
})
export class MaterialModule { }

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
  MatDialogModule,
  MatInputModule
} from '@angular/material';

const MATERIAL_COMPONENTS = [
  MatButtonModule,
  MatCheckboxModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
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
  ]
})
export class MaterialModule { }

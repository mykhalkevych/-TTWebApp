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
  MatDialogRef,
  MatCardModule,
  MatTableModule,
  MatExpansionModule,
  MatTabsModule,
  MatBadgeModule,
  MatSelectModule,
  MatRadioModule,
  MatSlideToggleModule
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
  MatInputModule,
  MatCardModule,
  MatTableModule,
  MatExpansionModule,
  MatTabsModule,
  MatBadgeModule,
  MatSelectModule,
  MatRadioModule,
  MatSlideToggleModule
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

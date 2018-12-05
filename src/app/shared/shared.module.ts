import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from './material.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { LoginDialogComponent } from './components/dialog/login-dialog/login-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationDialogComponent } from './components/dialog/registration-dialog/registration-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginDialogComponent,
    RegistrationDialogComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginDialogComponent
  ],
  entryComponents: [LoginDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }

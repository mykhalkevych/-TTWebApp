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
import { SettingDialogComponent } from './components/dialog/setting-dialog/setting-dialog.component';
import { NewGameDialogComponent } from './components/dialog/new-game-dialog/new-game-dialog.component';


const SHARED_DIALOGS = [
  LoginDialogComponent,
  RegistrationDialogComponent,
  SettingDialogComponent,
  NewGameDialogComponent
];

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ...SHARED_DIALOGS
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginDialogComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    ...SHARED_DIALOGS
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }

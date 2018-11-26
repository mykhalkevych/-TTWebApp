import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from './material.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginDialogComponent } from './components/dialog/login-dialog/login-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginDialogComponent
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
    MaterialModule
  ]
})
export class SharedModule { }

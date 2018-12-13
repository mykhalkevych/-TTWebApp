import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminNewsComponent } from './components/admin-news/admin-news.component';
import { AdminPlayersComponent } from './components/admin-players/admin-players.component';
import { AdminGamesComponent } from './components/admin-games/admin-games.component';

@NgModule({
  declarations: [AdminComponent, AdminNewsComponent, AdminPlayersComponent, AdminGamesComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

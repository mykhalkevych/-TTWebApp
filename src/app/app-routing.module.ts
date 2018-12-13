import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RulesComponent } from './pages/rules/rules.component';
import { PlayerDetailComponent } from './pages/player-detail/player-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'rules',
    component: RulesComponent
  },
  {
    path: 'player/:id',
    component: PlayerDetailComponent
  },
  {
    path: 'games',
    loadChildren: './pages/games/games.module#GamesModule'
  },
  {
    path: 'rating',
    loadChildren: './pages/rating/rating.module#RatingModule'
  },
  {
    path: 'admin',
    loadChildren: './pages/admin/admin.module#AdminModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

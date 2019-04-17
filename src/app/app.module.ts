import { NewsEffects } from './store/effects/news.effects';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PlayerEffects } from './store/effects/player.effects';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MaterialModule } from './shared/material.module';
import { reducers } from './store/app.states';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/effects/auth.effects';
import { RulesComponent } from './pages/rules/rules.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedEffects } from './store/effects/shared.effects';
import { PlayerDetailComponent } from './pages/player-detail/player-detail.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { GameEffects } from './store/effects/game.effects';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireMessaging } from '@angular/fire/messaging';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RulesComponent,
    PlayerDetailComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, SharedEffects, PlayerEffects, NewsEffects, GameEffects]),
    StoreDevtoolsModule.instrument(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  bootstrap: [AppComponent],
  providers: [AngularFireDatabase, AngularFireMessaging]
})
export class AppModule { }

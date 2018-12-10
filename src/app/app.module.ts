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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RulesComponent,
    PlayerDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    MaterialModule,
    SharedModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects, SharedEffects, PlayerEffects]),
    StoreDevtoolsModule.instrument(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

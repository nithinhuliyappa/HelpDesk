import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { HeaderModule } from './components/header/header.module';
import { LoaderModule } from './components/loader/loader.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    LoaderModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Required for everything
    AngularFireDatabaseModule, // Only required for database features
    AngularFireAuthModule // Only required for auth features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

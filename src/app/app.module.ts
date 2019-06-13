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
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    LoaderModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 5000, positionClass: 'toast-top-center' }),
    AngularFireModule.initializeApp(environment.firebaseConfig), // Required for everything
    AngularFireDatabaseModule, // Only required for database features
    AngularFireAuthModule // Only required for auth features
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { UserService } from './app/user.service';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import bootstrap from './main.server';


  bootstrapApplication(AppComponent,{
    providers:[provideRouter(routes),UserService,importProvidersFrom(HttpClientModule)]
   }).catch(err=>console.log(err));

  // platformBrowserDynamic().bootstrapModule(AppModule)
  //.catch(err => console.error(err));

  // bootstrapApplication(AppComponent,appConfig).catch(err=>console.log(err));
import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FormsModule, NgControl } from '@angular/forms';
//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule, routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, provideRouter } from '@angular/router';
import bootstrap from '../main.server';
import { UserService } from './user.service';
import { CustomerDashboardComponent } from './home/customer-dashboard/customer-dashboard.component';
import { AgentDashboardComponent } from './home/agent-dashboard/agent-dashboard.component';

@NgModule({
  declarations: [
    //AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AppComponent    
    
    // Other components and directives
  ],
  imports: [
    AppComponent,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    NgModule,
    LoginComponent,
    RegisterComponent
    
    // Other modules
  ],
  // Do not use the bootstrap array here

  // Optionally, if you need to do something when the application is bootstrapped, you can provide a callback.
  providers:[provideRouter(routes),UserService,importProvidersFrom(HttpClientModule)],
  //bootstrap:[AppComponent]

})

export class AppModule {}

/*export function bootstrapApplication(): () => Promise<void> {
  return () => {
    // Any initialization logic can be placed here
    return Promise.resolve();
  };
}*/
bootstrapApplication(AppComponent,{
  providers:[provideRouter(routes),UserService,importProvidersFrom(HttpClientModule)]
 }).catch(err=>console.log(err));
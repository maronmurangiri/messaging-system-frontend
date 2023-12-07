import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Routes, provideRouter } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { CustomerDashboardComponent } from './home/customer-dashboard/customer-dashboard.component';
import { AgentDashboardComponent } from './home/agent-dashboard/agent-dashboard.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {path: 'customer-dashboard/:id/:userType', component: CustomerDashboardComponent},
  {path: 'agent-dashboard/:id/:userType', component: AgentDashboardComponent},
  { path: '', redirectTo: '/register', pathMatch: 'full' },
];

/*bootstrapApplication(AppComponent,{
  providers:[provideRouter(routes),UserService,importProvidersFrom(HttpClientModule)]
 }).catch(err=>console.log(err));*/

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

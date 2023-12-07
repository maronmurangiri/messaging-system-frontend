import { Component, NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UserService } from './user.service';
import { HttpClient, HttpClientModule, HttpHandler, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, NgControl, NgForm, NgModel } from '@angular/forms';

provideHttpClient(withFetch());

@Component({
  selector: 'app-root',
  standalone:true,
  imports:[RouterOutlet,CommonModule,HttpClientModule],
  template: '<router-outlet></router-outlet>',
  //templateUrl: 'register/register.component.html',
  //styleUrls: ['register/register.component.css'],
  //providers:[UserService,HttpClient,FormsModule,NgModule,HttpClientModule,NgForm],
})


export class AppComponent {
  title = 'messaging-system-frontend';
}

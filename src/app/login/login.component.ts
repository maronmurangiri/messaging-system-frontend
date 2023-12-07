/*import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[UserService],
})
export class LoginComponent {

 

  email: string ="";
  password: string ="";
  userType: String = "";
  


  constructor(private userService:UserService,private router: Router,private http: HttpClient) {}
 


  login() {
    console.log(this.email);
    console.log(this.password);
    console.log(this.userType);
 
    let bodyData = {
      email: this.email,
      password: this.password,
      userType: this.userType
    };
 
        // Call the login method from your UserService
        this.userService.login(bodyData).subscribe(
          (resultData:any) => {
            const userType = resultData.userType;
       
            this.userService.setUserType(userType);
            this.userService.setId(id);

            // Navigate the user to the appropriate page based on the user type
           if(userType==='CUSTOMER'){
              this.router.navigate(['/customer-dashboard',id,userType])
            }else if(userType==='AGENT'){
              this.router.navigate(['/agent-dashboard',id,userType]);
            }
          },
          (error: any) => {
            console.log('Login failed',error)
          }
        );
    }

}*/

import { Component,Inject, NgModule, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { NgForm,NgControl } from '@angular/forms';
import { AppModule } from '../app.module';
import { response } from 'express';
import { error } from 'node:console';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService,NgModule],
})

export class LoginComponent{
  constructor(private userService: UserService, private router: Router){}

  login(loginForm: NgForm){
      if(loginForm.valid){
        const userData = {
         email : loginForm.value.email,
         userType : loginForm.value.userType,
         password : loginForm.value.password
      }

        // Call the login method from your UserService
        this.userService.login(userData).subscribe(
          (response:any) => {
            const userType:string = response.userType;
            const id:number = response.id;
            console.log(id);
            console.log('User Type in login:', userType);
            console.log('User ID in login:', id);
       
            this.userService.setUserType(userType);
            this.userService.setId(id);
            
            
           /* setTimeout(() => {
              this.router.navigate(['/home']);
            }, 10);*/
            // Navigate the user to the appropriate page based on the user type
            //this.router.navigate(['/home']);
            alert("Login successful")
            if(userType==='CUSTOMER'){
              this.router.navigate(['/customer-dashboard',id,userType]);
            }else if(userType==='AGENT'){
              this.router.navigate(['/agent-dashboard',id,userType]);
            }
          },
          (error) => {
            console.log('Login failed',error)
          }
        );
        
      }
  }
 
}
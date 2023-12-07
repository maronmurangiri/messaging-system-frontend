/*import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService],
})
export class RegisterComponent {
  username: string ="";
  email: string ="";
  password: string ="";
  userType:String="";


  constructor(private http: HttpClient ,private userService:UserService,private router:Router)
  {

  }
  register()
  {
  
    let bodyData = {
      "username" : this.username,
      "email" : this.email,
      "password" : this.password,
      "userType": this.userType
    };
    //Call the registerUser method from the UserService
  this.userService.register(bodyData).subscribe(
    (response) => {
       // Handle successful registration response
      console.log('Registration successful', response);

      // Redirect to login page after successful registration
     // this.router.navigate([])
     this.router.navigate(['/login'])
    },
    (error)=>{
      console.log('Registration error',error);
    }
)


}
  }*/


import { Component, Inject, ViewChild, importProvidersFrom } from '@angular/core';
import { Router, RouterLink, provideRouter } from '@angular/router'; 
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { error } from 'console';
import { FormsModule } from '@angular/forms';
import { routes } from '../app.routes';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone:true,
  imports:[FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService,FormsModule]
})

export class RegisterComponent {
  // Declare and initialize registerForm
  @ViewChild('registerForm') registerForm!:NgForm

  constructor(private userService:UserService, private router:Router){
  
  }

  
  register(){
    console.log('Trying to register:', this.registerForm.value);
    //capturing user input
    const userData = {
      username: this.registerForm.value.username,
      email : this.registerForm.value.email,
      password : this.registerForm.value.password,
      userType : this.registerForm.value.userType

    }

   //Call the registerUser method from the UserService
  this.userService.register(userData).subscribe(
        (response) => {
           // Handle successful registration response
          console.log('Registration successful', response);

          // Redirect to login page after successful registration
          //this.router.navigate([])
          alert("User registered successfully");
          this.router.navigate(['/login'])
        },
        (error)=>{
          console.log('Registration error',error);
        }
    )

   

}

}

import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from '../../user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,HttpClientModule],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent implements OnInit {
  //to store id
  private id:number|any;
  private userType:string|any;
   // To store the new message being composed
  newMessage: string = '';

  // To store the list of messages
    messages: any[] = []; 

    // Constructor with HttpClient injection
    constructor(private router:Router, private http: HttpClient,private userService:UserService,private route:ActivatedRoute) {}
     

    // Lifecycle hook - ngOnInit
    ngOnInit(): void {
      this.route.params.subscribe((params)=>{
        this.id = +params['id'];
        this.userType = params['userType'];

        console.log('User ID:', this.id);
        console.log('User Type:', this.userType);

        // Fetch customer messages from the backend
        this.fetchCustomerMessages();
      })
      
        
    }

    // Method to send a message
    sendMessage(): void {
        // Send the message to the backend
        this.http.post(`http://localhost:8080/api/v1/message/send?id=${this.id}`, { 
          message: this.newMessage
         })
            .subscribe(response => {
                // Handle the response as needed
                console.log(response);
                // Clear the newMessage field after sending
                this.newMessage = '';
                // Fetch updated list of messages
                this.fetchCustomerMessages();
                alert("Message sent succeefully");
            });
    }
    hasResponses(): boolean {
      //return this.messages.some(message => !!message.response);
      return this.messages.some(messages=> messages.response !== null && messages.response !== undefined && messages.response !== '');
    }

    hasResponse(message: any): boolean {
      return message.response !== null && message.response !== undefined && message.response !== '';
    }
    
//      return message.response !== null && message.response !== undefined && message.response !== '';
    // Method to fetch customer messages
    fetchCustomerMessages(): void {
      console.log(this.id)
      console.log(this.userType)
        this.http.get<any[]>(`http://localhost:8080/api/v1/message/messages-by-user?id=${this.id}&userType=${this.userType}`)
            .subscribe(data => this.messages = data);
    }

    logout(): void {
      // Clear user-related information
      this.userService.setUserType('');
      this.userService.setId(null);
        alert("Logged out successfully")
      // Navigate to the login page
      this.router.navigate(['/login']);
    }
}

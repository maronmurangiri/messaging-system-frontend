import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from '../../user.service';
import { FormBuilder, FormsModule,FormGroup, ReactiveFormsModule } from '@angular/forms';
import { response } from 'express';


@Component({
  selector: 'app-agent-dashboard',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule,ReactiveFormsModule],
  templateUrl: './agent-dashboard.component.html',
  styleUrl: './agent-dashboard.component.css'
})
export class AgentDashboardComponent implements OnInit{
  private id:number|any;
  private userType!:string;
  private cannedResponseId:any;

  // Define a variable to store messages
  messages: any[] = []; 
  cannedResponses: any[] = [];

  selectedCannedResponse!: number ;

  

  selectedMessage: any;
  showResponseForm = false;
  responseText = '';
  status = '';

  searchResults: any[] = [];
  // New property for the search form
  searchForm: FormGroup;

  respondedMessages: { [key: number]: boolean } = {}; 


  constructor(private router:Router, private formBuilder: FormBuilder, private userService: UserService,private route:ActivatedRoute,private http:HttpClient) {
    this.searchForm = this.formBuilder.group({
      keyword: [''], // Initialize with an empty string
    });
  }

  ngOnInit(): void {

    // Fetch canned responses when the component initializes
    this.fetchCannedResponses();

    this.route.params.subscribe((params)=>{
      this.id = +params['id'];
      this.userType = params['userType'];

      console.log('User ID:', this.id);
      console.log('User Type:', this.userType)});

      this.userService.setId(this.id);
      this.userService.setUserType(this.userType)

      //this.agentService.setId(this.id);
      //this.agentService.setUserType(this.userType);
    // Fetch messages assigned to the agent on component initialization
    this.fetchAgentMessages();

  }

  onKeywordChange(keyword: string): void {
    console.log('Keyword Change:', keyword);
  }

  searchMessages(): void {
    console.log('searchMessages called');
    const keyword = this.searchForm.value.keyword;
    console.log('Keyword:', keyword);
    if (keyword) {
      this.userService.searchMessages(keyword).subscribe((data) => {
        this.searchResults = data;
        console.log("search data",this.searchResults);
      });
    } else {
      // Handle the case when the search input is empty (fetch all messages or show an alert)
      this.fetchAgentMessages();
    }
  }


  fetchAgentMessages(): void {
    // Use your agent service to fetch messages
    this.userService.getAgentMessages().subscribe(data => {
      this.messages = data;
    });
  }

  fetchCannedResponses(): void {
    this.userService.getCannedResponses().subscribe((data) => {
      console.log('Canned Responses:',data);
      this.cannedResponses = data;
    });
  }

  respondToMessage(message:any): void {
  

    this.selectedMessage = message;
    this.showResponseForm = true;
     
    // Use your agent service to respond to a message
    /*this.userService.respondToMessage(message.getId,this.id, responseObj).subscribe(() => {
      // After responding, fetch updated messages
      this.fetchAgentMessages();
    });*/
  }

  submitResponse(): void {
    if (!this.selectedMessage) {
      // Handle the case where no message is selected
      return;
    }
    const messageId = this.selectedMessage.id;
    this.cannedResponseId = this.selectedCannedResponse;

    if (this.cannedResponseId) {
      console.log("canned response id",this.cannedResponseId);
      // Respond with canned response
      this.userService.respondToMessage(messageId, this.id, '', this.status, this.cannedResponseId).subscribe(() => {
       
        // After responding, update the isResponded status in the backend
      this.userService.updateIsResponded(messageId, true).subscribe(() => {
        // After responding, fetch updated messages
        this.fetchAgentMessages();
  
        // Reset the form and hide it
        this.responseText = '';
        this.status = '';
        this.showResponseForm = false;
        

        this.userService.getIsResponded(messageId).subscribe(isResponded=>{
          alert('Message successfully responded to with canned response!');
          this.respondedMessages[messageId] =isResponded;
        });
      });
     });
    } else {
      // Respond with custom response
      this.userService.respondToMessage(messageId, this.id, this.responseText, this.status).subscribe(() => {
        
        this.userService.updateIsResponded(messageId,true).subscribe(()=>{
        
        // After responding, fetch updated messages
        this.fetchAgentMessages();
  
        // Reset the form and hide it
        this.responseText = '';
        this.status = '';
        this.showResponseForm = false;
  this.userService.getIsResponded(messageId).subscribe(isResponded =>{
    alert('Message successfully responded to!');
    this.respondedMessages[messageId] = isResponded;
  });
});
});
    }
    
  }

  saveCannedMessage(cannedMessage: any): void {
    this.userService.saveCannedMessage(cannedMessage).subscribe(
      (response) => {
        // Handle success, if needed
        console.log('Canned message saved successfully:', response);
        // Fetch the updated list of canned responses after saving
        this.fetchCannedResponses();
        alert("Canned message saved successfuly");
      },
      (error) => {
        // Handle error, if needed
        console.error('Error saving canned message:', error);
      }
    );
  }

  logout(): void {
    // Clear user-related information
    this.userService.setUserType('');
    this.userService.setId(null);
    alert("Logged out successfully");
    // Navigate to the login page
    this.router.navigate(['/login']);
  }
  }
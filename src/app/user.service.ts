import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { error } from 'console';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class UserService {
  private userType!: string ;
  private id!: number |null;


  private apiUrl = 'http://localhost:8080';
  private messageapiUrl = 'http://localhost:8080/api/v1/message';
  

  constructor(private http:HttpClient){
  

  }
  

  register(bodyData: { username: string; email: string; password: string; userType: String; }) {
    const registrationUrl = `${this.apiUrl}/api/v1/create-account`;
    return this.http.post(registrationUrl,bodyData)
    .pipe(
      catchError((error)=>{
        console.log('Registration error', error);
        throw error;
      })
    );
    
  }

  login(user: { email: string; password: string; userType: String; }){

    const loginUrl = `${this.apiUrl}/api/v1/sign-in`;
    return this.http.post(loginUrl,user)
    
  }

  getAgentMessages(): Observable<any[]> {
    console.log("id in get agent",this.id)
    console.log("user type in get agent",this.userType)
    // Implement your API endpoint to fetch messages assigned to the agent
    return this.http.get<any[]>(`${this.messageapiUrl}/messages-by-user?id=${this.id}&userType=${this.userType}`);
  }

  respondToMessage(messageId: number,agentId:number, response:string,status:string,cannedResponseId?:number): Observable<any> {
       if (cannedResponseId) {
      // Implement your API endpoint to respond to a message with a canned response
      return this.http.post<any>(`${this.messageapiUrl}/respond-with-canned?status=${status}`,{messageId,agentId,cannedMessageId:cannedResponseId});
    } else {
      // Implement your API endpoint to respond to a message with a custom response
      return this.http.post<any>(`${this.messageapiUrl}/respond/${messageId}/${agentId}`, { response,status});
    }
  }

  getCannedResponses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.messageapiUrl}/get-canned-messages`);
  }

  searchMessages(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.messageapiUrl}/search?keyword=${keyword}`);
  }

  updateIsResponded(messageId: number, isResponded: boolean): Observable<any> {
    console.log("updating values", messageId,isResponded);
    return this.http.post<any>(`${this.messageapiUrl}/save-is-responded`, {
      messageId,
      isResponded
    }).pipe(
      catchError((error) => {
        console.log('Update isResponded error', error);
        throw error;
      })
    );
  }

  getIsResponded(messageId: number): Observable<any> {
    console.log(messageId);
    return this.http.get<any>(`${this.messageapiUrl}/get-is-responded?messageId=${messageId}`).pipe(
      catchError((error) => {
        console.log('Get isResponded error', error);
        throw error;
      }),
      map(response=>response.isResponded)
    );
  }

  saveCannedMessage(cannedMessage: any): Observable<any> {
    return this.http.post<any>(`${this.messageapiUrl}/save-canned-message`, cannedMessage).pipe(
      catchError((error) => {
        console.log('Save canned message error', error);
        throw error;
      })
    );
  }

  setId(id:number|null){
    console.log("Setting id:",id)
    this.id=id;
  }
  setUserType(userType: string) {
    console.log("setting user type: ", userType)
    this.userType = userType;
  }
  getUserType() {
    return this.userType;
  }

  
  getId(){
    return this.id;
  }

}
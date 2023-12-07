import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[UserService],
})
export class HomeComponent implements OnInit {
  userType: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Get the user type from the UserService
    this.userType = this.userService.getUserType();

    // Redirect based on user type
    if (this.userType === 'CUSTOMER') {
      this.router.navigate(['/customer-dashboard']);
    } else if (this.userType === 'AGENT') {
      this.router.navigate(['/agent-dashboard']);
    } else {
      // Redirect to a default page or handle other user types accordingly
      this.router.navigate(['/register']);
    }
  }
}
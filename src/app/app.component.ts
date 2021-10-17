import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { slideInAnimation} from './app.animation';

import { AuthService } from './user/auth.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  constructor(private authService: AuthService,
    private router: Router) { }

  logOut(): void {
    this.authService.logout();
    // user navigateByUrl instead of navigate to make sure all all exisiting parameter and secondary route are cleaed out the extra are cleared out.
    this.router.navigateByUrl('/welcome');
    console.log('Log out');
  }
}

import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { Component } from '@angular/core';
import { slideInAnimation } from './app.animation';

import { AuthService } from './user/auth.service';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loading = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  get isMessageDisplayed(): boolean {
    return this.messageService.isDisplayed;
  }

  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRuterEvent(routerEvent);
    });

  }

  checkRuterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }
    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  logOut(): void {
    this.authService.logout();
    // user navigateByUrl instead of navigate to make sure all all exisiting parameter and secondary route are cleaed out the extra are cleared out.
    this.router.navigateByUrl('/welcome');
    console.log('Log out');
  }

  displayMessages(): void {
    this.router.navigate([{ outlets: { popup: ['messages'] } }]);
    this.messageService.isDisplayed = true;
  }

  hideMessages(): void {
    this.router.navigate([{ outlets: { popup: null } }]);
    this.messageService.isDisplayed = false;
  }

  navigateToWelcome(): void {
    // the secondary route does not work ere
    //this.router.navigate(['/welcome', { outlets: { popup: ['messages'] } }]);

    this.router.navigate([{
      outlets: {
        primary: ['welcome'],  // no slash before welcome
        popup: ['messages']
      }
    }]);
  }
}

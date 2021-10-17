import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { MessageComponent } from './messages/message.component';
import { PageNotFoundComponent } from './page-not-found.component';

const ROUTES = [
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'home', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
]

// const ROUTES2 = [
//   { path: '', component: MessageComponent, outlet:'popup' }
// ]

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, { enableTracing: true }),
    // RouterModule.forRoot(ROUTES2, { enableTracing: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { ViryfEmailComponent } from './components/auth/viryf-email/viryf-email.component';
import { DashboardComponent } from './components/auth/dashboard/dashboard.component';
import { BodyHitsComponent } from './components/body-hits/body-hits.component';
import { HideoutComponent } from './components/hideout/hideout.component';


const routes: Routes = [
  {path: '', component: SignInComponent},
  {path: 'register', component: SignUpComponent},
  {path: 'veryf-email', component: ViryfEmailComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'bodyHits', component: BodyHitsComponent},
  {path: 'hideout', component: HideoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LandingPageComponent } from './components/feature-landing-page/landing-page/landing-page.component';
import { HomeComponent } from './layout/home/home.component';
import { ProfileComponent } from './layout/profile/profile.component';
import { InterventionsComponent } from './layout/intervention/intervention.component';
import { InterventionDetailComponent } from './layout/intervention-detail/intervention-detail.component';
import { ApiariesComponent } from './components/feature-apiaries/apiaries/apiaries.component';

import { HiveComponent } from './hive/hive.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    { path: 'home', component: HomeComponent },
    { path: 'landing', component: LandingPageComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'intervention', component: InterventionsComponent },
    { path: 'intervention/:id', component: InterventionDetailComponent },
    { path: 'apiaries', component: ApiariesComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'intervention/:id', component: InterventionDetailComponent },
    { path: 'hive', component: HiveComponent },
];

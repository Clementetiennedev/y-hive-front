import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LandingPageComponent } from './components/feature-landing-page/landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutUsComponent } from './components/feature-about-us/about-us/about-us.component';


export const routes: Routes = [
    { path: '', component: LandingPageComponent},
    { path: 'home', component: HomeComponent},
    { path: 'landing', component: LandingPageComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'about-us', component: AboutUsComponent},
    { path: 'profile', component: ProfileComponent }
];

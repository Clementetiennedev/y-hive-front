import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LandingPageComponent } from './components/feature-home-page/landing-page/landing-page.component';

export const routes: Routes = [
    // Route example
    //{ path: 'home', component: nomComponent},
    { path: '', component: LandingPageComponent},
    { path: 'landing', component: LandingPageComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
];

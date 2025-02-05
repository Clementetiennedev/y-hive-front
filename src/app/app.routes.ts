import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/feature-home-page/landing-page/landing-page.component';

export const routes: Routes = [
    // Route example
    //{ path: 'landing', component: nomComponent},
    { path: '', component: LandingPageComponent}, 
    { path: 'landing', component: LandingPageComponent}, 
];

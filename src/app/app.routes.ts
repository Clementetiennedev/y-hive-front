import { Routes } from '@angular/router';
import { HomePageComponent } from './components/feature-home-page/home-page/home-page.component';

export const routes: Routes = [
    // Route example
    //{ path: 'home', component: nomComponent},
    { path: '', component: HomePageComponent}, 
    { path: 'home', component: HomePageComponent}, 
];

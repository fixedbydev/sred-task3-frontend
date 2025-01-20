import { Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details.component';

export const routes: Routes = [
    { path: ':userName', component: UserDetailsComponent }
];

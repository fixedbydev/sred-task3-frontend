import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'main', loadChildren: () => import('./pages/main/main.route').then(r => r.routes) },
    { path: 'user-detail', loadChildren: () => import('./pages/user-details/user-details.routes').then(r => r.routes) },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/users/users.component').then(
        (m) => m.UsersComponent
      ),
  },
];

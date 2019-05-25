import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home',
    loadChildren: './pages/home/home.module#HomeModule',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: './pages/register/register.module#RegisterModule',
    pathMatch: 'full'
  },
  {
    path: 'tickets',
    loadChildren: './pages/ticket/ticket.module#TicketModule',
    pathMatch: 'full'
  },
  {
    path: 'add-ticket',
    loadChildren: './pages/add-ticket/add-ticket.module#AddTicketModule',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadChildren: './pages/user/user.module#UserModule',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

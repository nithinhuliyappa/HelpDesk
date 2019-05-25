import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home',
    loadChildren: './pages/home/home.module#HomeModule',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginModule',
    pathMatch: 'full'
  },
  {
    path: 'register-user',
    loadChildren: './pages/register/register.module#RegisterModule',
    pathMatch: 'full'
  },
  {
    path: 'tickets',
    loadChildren: './pages/ticket/ticket.module#TicketModule',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'add-ticket',
    loadChildren: './pages/add-ticket/add-ticket.module#AddTicketModule',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: './pages/user/user.module#UserModule',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

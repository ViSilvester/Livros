import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthService],
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'cadastrar',
    canActivate: [AuthService],
    loadChildren: () => import('./pages/cadastrar/cadastrar.module').then(m => m.CadastrarPageModule)
  },
  {
    path: 'detalhes',
    canActivate: [AuthService],
    loadChildren: () => import('./pages/detalhes/detalhes.module').then(m => m.DetalhesPageModule)
  },
  {
    path: 'editar',
    canActivate: [AuthService],
    loadChildren: () => import('./pages/editar/editar.module').then(m => m.EditarPageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [AuthService],
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'sing-up',
    canActivate: [AuthService],
    loadChildren: () => import('./pages/sing-up/sing-up.module').then(m => m.SingUpPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

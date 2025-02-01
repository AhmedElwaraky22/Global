import { Routes } from '@angular/router';
import { ParentComponent } from './component/parent/parent.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';

export const routes: Routes = [
  { path: '', component:  LoginComponent},
  { path: 'home', loadComponent:()=>import('../app/component/parent/parent.component').then(m=>m.ParentComponent) },
  { path: 'register', component:RegisterComponent  },
];

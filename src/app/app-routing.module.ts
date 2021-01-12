import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';


const routes: Routes = [

  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full'
  },
  
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  
  {
    path: 'employees',
    loadChildren: () => import('./pages/employees/employees.module').then(m => m.EmployeesModule)
  },

  {
    path: '**',
    component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'corrected' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

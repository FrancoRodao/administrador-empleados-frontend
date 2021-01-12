import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardSignedIn } from 'src/app/guards/auth.guard';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [

    {
        path: 'signin',
        component: SigninComponent,
        canActivate: [AuthGuardSignedIn]
    },

    {
        path: 'signup',
        component: SignupComponent,
        canActivate: [AuthGuardSignedIn]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRouting { }
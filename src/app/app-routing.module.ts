import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterTalentComponent } from './components/registerTalent/register-talent.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { DesAuthGuard } from './guards/desAuth/des-auth.guard';

const routes: Routes = [
  {path: "", redirectTo: "land", pathMatch: "full"},
  {path: "land", component: LandingComponent, canActivate: [DesAuthGuard]},
  {path: "signUp", component: RegisterComponent, canActivate: [DesAuthGuard]},
  {path: "joinAsTalent", component: RegisterTalentComponent, canActivate: [DesAuthGuard]},
  {path: "login", component: LoginComponent, canActivate: [DesAuthGuard]},
  {path: "home", component: HomeComponent, canActivate: [AuthGuard]}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

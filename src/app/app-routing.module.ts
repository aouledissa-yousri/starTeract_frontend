import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterTalentComponent } from './components/registerTalent/register-talent.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { DesAuthGuard } from './guards/desAuth/des-auth.guard';
import { MainComponent } from './components/main/main.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TalentComponent } from './components/talent/talent.component';
import { TasksComponent } from './components/tasks/tasks.component';


const routes: Routes = [
  {path: "", redirectTo: "land", pathMatch: "full"},
  {path: "land", component: LandingComponent, canActivate: [DesAuthGuard]},
  {path: "signUp", component: RegisterComponent, canActivate: [DesAuthGuard]},
  {path: "joinAsTalent", component: RegisterTalentComponent, canActivate: [DesAuthGuard]},
  {path: "login", component: LoginComponent, canActivate: [DesAuthGuard]},
  {path: "main", component: MainComponent, canActivate: [AuthGuard], 
    children: [
      {path: "", redirectTo: "home", pathMatch: "full"},
      {path: "home", component: HomeComponent},
      {path: "settings", component: SettingsComponent},
      {path: "notifications", component: NotificationsComponent},
      {path: "talent/:name", component: TalentComponent},
      {path: "tasks", component: TasksComponent}
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

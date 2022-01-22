import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: "", redirectTo: "signUp", pathMatch: "full"},
  {path: "land", component: LandingComponent},
  {path: "signUp", component: RegisterComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

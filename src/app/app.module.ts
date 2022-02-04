import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule, FormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { SwiperModule } from "swiper/angular"


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { RegisterComponent } from './components/register/register.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CountryFilterPipe } from './pipes/countryFilter/country-filter.pipe';
import { RegisterTalentComponent } from './components/registerTalent/register-talent.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { SettingsComponent } from './components/settings/settings.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { TalentComponent } from './components/talent/talent.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ActivitiesComponent } from './components/activites/activites.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegisterComponent,
    LoadingComponent,
    CountryFilterPipe,
    RegisterTalentComponent,
    LoginComponent,
    HomeComponent,
    MainComponent,
    SettingsComponent,
    NotificationsComponent,
    TalentComponent,
    TasksComponent,
    ActivitiesComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ScrollingModule,
    SwiperModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy}],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {CustomerLayoutComponent} from "./layouts/customer-layout/customer-layout.component";
import {EmployLayoutComponent} from "./layouts/employ-layout/employ-layout.component";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {OwlModule} from 'ngx-owl-carousel';
// import {ToastrModule} from "ngx-toastr";
// import { provideAnimations } from '@angular/platform-browser/animations';
// import { provideToastr } from 'ngx-toastr';
import {UserService} from "./service/user.service";
import {TokenService} from "./service/token.service";
import {AuthService} from "./service/auth.service";
import {BeforeGuards} from "./service/guards/before.guards";
import {AfterGuards} from "./service/guards/after.guards";
import {CustomerApiService} from "./service/customer-api.service";
import {CustomerGuards} from "./service/guards/customer.guards";
import {CommonService} from "./service/common.service";
import {EmployApiService} from "./service/employ-api.service";
import {NotificationService} from "./service/notification.service";
import {PaymentService} from "./service/payment.service";
import {SharedService} from "./service/shared.service";
import {ViewCalendarService} from "./service/viewcalendar.service";

@NgModule({
  imports: [
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      ComponentsModule,
      RouterModule,
      OwlModule,
      // ToastrModule.forRoot(), // ToastrModule added
      AppRoutingModule,
  ],
  declarations: [
      AppComponent,
      AdminLayoutComponent,
      CustomerLayoutComponent,
      EmployLayoutComponent,
      LoginComponent,
      RegisterComponent,
      HomeComponent,
  ],
  providers: [
      // provideAnimations(), // required animations providers
      // provideToastr(), // Toastr providers
      SharedService,
      UserService,
      TokenService,
      AuthService,
      BeforeGuards,
      AfterGuards,
      CustomerGuards,
      CustomerApiService,
      EmployApiService,
      NotificationService,
      PaymentService,
      ViewCalendarService,
      CommonService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployLayoutRoutes } from './employ-layout.routing';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from "@angular/material/radio";
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DashboardComponent} from "../../pages/employ/dashboard/dashboard.component";
import {EmployeeUserProfileComponent} from "../../pages/employ/user-profile/employee-user-profile.component";
import { AdminEmployModule } from '../admin-employ.module';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(EmployLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatRadioModule,
        MatCardModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        AdminEmployModule,
    ],

  declarations: [
      DashboardComponent,
      EmployeeUserProfileComponent,
  ]
})

export class EmployLayoutModule {}

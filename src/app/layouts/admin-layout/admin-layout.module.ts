import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
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
import {DashboardComponent} from "../../pages/admin/dashboard/dashboard.component";
import {AdminEditComponent} from "../../pages/admin/admin-edit/admin-edit.component";
import {UserProfileComponent} from "../../pages/admin/user-profile/user-profile.component";
import {EmployEditComponent} from "../../pages/admin/employ-edit/employ-edit.component";
import {AdminEmployModule} from "../admin-employ.module";
import { MatPaginatorModule } from '@angular/material/paginator';
import { AdminsComponent } from 'app/pages/admin/admins/admins.component';
import { EmploysComponent } from 'app/pages/admin/employs/employs.component';
import {MatTableModule} from "@angular/material/table";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
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
        MatPaginatorModule,
        MatTableModule,
        MatSlideToggleModule,
        AdminEmployModule,
    ],

  declarations: [
      DashboardComponent,
      UserProfileComponent,
      AdminsComponent,
      AdminEditComponent,
      EmploysComponent,
      EmployEditComponent,
  ]
})

export class AdminLayoutModule {}

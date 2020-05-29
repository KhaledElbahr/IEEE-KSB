import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Reactive Forms Module
import { ReactiveFormsModule } from '@angular/forms';
// Routing Module
import { AuthRoutingModule } from './auth-routing.module';
// Material Module
import { MaterialModule } from '../shared/modules/material.module';

import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ConfirmPasswordDirective } from './confirm-password.directive';

@NgModule({
  declarations: [
    LoginComponent,
    ResetPasswordComponent,
    ConfirmPasswordDirective
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AuthModule { }

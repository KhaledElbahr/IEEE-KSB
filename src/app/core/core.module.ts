import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
// Http Interceptor Provides
import { HttpInterceptorProviders } from './Interceptors';
// Can Deactivate Guard
import { CanDeactivateGuard } from './services/can-deactivate.guard';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [HttpInterceptorProviders, CanDeactivateGuard]
})
export class CoreModule { }

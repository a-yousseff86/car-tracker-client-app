import {ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {TranslationModule} from './shared/langauge/translation.module';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {NgbDateAdapter} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateDayjsAdapter} from './config/datepicker-adapter';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom(BrowserModule, BrowserAnimationsModule),
    importProvidersFrom(TranslationModule),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: LOCALE_ID, useValue: 'de'},
    { provide: NgbDateAdapter, useClass: NgbDateDayjsAdapter },
  ]
};

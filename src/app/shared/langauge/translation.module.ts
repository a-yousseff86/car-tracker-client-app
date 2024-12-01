import {inject, NgModule} from '@angular/core';
import {MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {missingTranslationHandler, translatePartialLoader} from './translation.config';
import {StateStorageService} from '../../core/config/state-storage.service';

@NgModule({
  declarations: [],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translatePartialLoader,
        deps: [HttpClient],
      },
      missingTranslationHandler: {
        provide: MissingTranslationHandler,
        useFactory: missingTranslationHandler,
      },
    }),
  ],
})
export class TranslationModule {
  private readonly translateService = inject(TranslateService);
  private readonly stateStorageService = inject(StateStorageService);

  constructor() {
    this.translateService.setDefaultLang('en');
    const langKey = this.stateStorageService.getLocale() ?? 'en';
    this.translateService.use(langKey);
  }
}

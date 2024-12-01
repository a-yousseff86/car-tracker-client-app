import {Component, inject, signal} from '@angular/core';
import {LANGUAGES} from '../../shared/langauge/language.constants';
import {StateStorageService} from '../../core/config/state-storage.service';
import {TranslateService} from '@ngx-translate/core';
import {UpperCasePipe} from '@angular/common';
import ActiveMenuDirective from '../../shared/langauge/active-menu.directive';
import dayjs from 'dayjs/esm';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  imports: [
    UpperCasePipe,
    ActiveMenuDirective,
    RouterLinkActive,
    RouterLink,
    MatIcon
  ],
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  languages = signal<string[]>(LANGUAGES);

  private readonly stateStorageService = inject(StateStorageService);
  private readonly translateService = inject(TranslateService);


  onLanguageChange(languageKey: string): void {
    this.stateStorageService.storeLocale(languageKey);
    this.translateService.use(languageKey)
    this.stateStorageService.selectedLanguage.set(languageKey);
  }

}

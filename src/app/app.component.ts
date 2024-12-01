import {Component, computed, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TranslateDirective} from './shared/langauge/translate.directive';
import {Dayjs} from 'dayjs';
import dayjs from 'dayjs/esm';
import {StateStorageService} from './core/config/state-storage.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateDirective],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'car-tracker-client-app';
  private readonly stateStorageService = inject(StateStorageService);
  today = computed(() => {
    const lang = this.stateStorageService.selectedLanguage();
    dayjs.locale(lang);
    return dayjs().utcOffset(); // This will output the date in a localized format like "April 15, 2024" or "15. April 2024"
  });

}

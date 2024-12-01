import { Component } from '@angular/core';
import {TranslateDirective} from '../shared/langauge/translate.directive';

@Component({
  selector: 'app-home',
  imports: [
    TranslateDirective
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

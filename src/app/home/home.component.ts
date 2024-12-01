import { Component } from '@angular/core';
import {TranslateDirective} from '../shared/langauge/translate.directive';
import {MapComponent} from '../map/map.component';

@Component({
  selector: 'app-home',
  imports: [
    TranslateDirective,
    MapComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

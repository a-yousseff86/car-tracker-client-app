import {Component, OnInit, signal} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {LocationFormComponent} from './location/location-form.component';

interface Car {
  id: number;
  name: string;
  model: string;
}

@Component({
  selector: 'app-journey-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    LocationFormComponent
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{
  journeyForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.journeyForm = this.fb.group({
      selectedCar: ['', Validators.required],
      fromLocation: this.fb.group({
        street: ['', Validators.required],
        number: ['', Validators.required],
        city: ['', Validators.required],
      }),
      toLocation: this.fb.group({
        street: ['', Validators.required],
        number: ['', Validators.required],
        city: ['', Validators.required],
      }),
    });
  }
  cars = signal<Car[]>([
    { id: 1, name: 'BMW', model: 'M3' },
    { id: 2, name: 'Audi', model: 'RS6' },
    { id: 3, name: 'Mercedes', model: 'AMG GT' }
  ]);


  onSubmit() {
    if (this.journeyForm.valid) {
      console.log(this.journeyForm.value);
    }
  }
}

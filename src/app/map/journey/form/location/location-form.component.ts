import {Component, inject, Input, model, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-location-form',
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './location-form.component.html',
  standalone: true,
  styleUrl: './location-form.component.scss'
})
export class LocationFormComponent implements OnInit {

  parentForm = model<FormGroup>();
  groupName = model<string>();
  title = model<string>();

  private fb: FormBuilder = inject(FormBuilder);

  ngOnInit(): void {
   if (!this.parentForm()!.contains(this.groupName()!)) {
      this.parentForm()!.addControl(this.groupName()!, this.fb.group({
        street: ['',  Validators.required],
        number: ['', Validators.required],
        city: ['', Validators.required]
      }));
      }
   }

}

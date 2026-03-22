import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreateMixedDataEntityFormGroup } from './mixed-data-entity.model'; // adjust path as needed

@Component({
  selector: 'app-data-detail',
  templateUrl: './data-detail.component.html',
  styleUrls: ['./data-detail.component.scss'],
})
export class DataDetailComponent implements OnInit {

  form!: FormGroup;

  /** Tracks which field is currently focused so hints are shown only on focus */
  focusedField: string | null = null;

  ngOnInit(): void {
    this.form = CreateMixedDataEntityFormGroup();
  }

  onFocus(fieldName: string): void {
    this.focusedField = fieldName;
  }

  onBlur(): void {
    this.focusedField = null;
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Submitted value:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  onReset(): void {
    this.form.reset();
    this.focusedField = null;
  }
}
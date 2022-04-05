import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories$ = new Observable<{ id: string; data: Category }[]>();

  form = new FormGroup({
    category: new FormControl('', [Validators.required]),
  });

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categories$ = this.categoriesService.loadCategory();
  }

  addCategory() {
    const category: Category = { ...this.form.value };
    this.categoriesService.addCategory(category);

    this.form.reset();
  }

  hasErrors(name: string) {
    const { dirty, touched, errors } = this.form.controls[name];
    return dirty && touched && errors;
  }

  getErrors(name: string) {
    const { dirty, touched, errors } = this.form.controls[name];
    if (dirty && touched && errors) {
      if (errors['required']) {
        return 'Value is required.';
      }
      return null;
    }
    return null;
  }
}

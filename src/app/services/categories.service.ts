import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(
    private firestore: AngularFirestore,
    private toastrService: ToastrService
  ) {}

  addCategory(category: Category) {
    this.firestore
      .collection('categories')
      .add(category)
      .then((docRef) => {
        console.log(docRef);
        this.toastrService.success(
          `Category ${category.category} added successfully.`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private firestore: AngularFirestore) {}

  addCategory(category: Category) {
    this.firestore
      .collection('categories')
      .add(category)
      .then((docRef) => {
        console.log(docRef);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

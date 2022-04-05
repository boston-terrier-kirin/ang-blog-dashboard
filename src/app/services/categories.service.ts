import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
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

  loadCategory() {
    return this.firestore
      .collection('categories')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          // 追加したCategoryのactionがまとめてGETできる。
          return actions.map((action) => {
            // それぞれのactionを変換してまとめて返す。
            const data = action.payload.doc.data() as Category;
            const id = action.payload.doc.id;
            return {
              id,
              data,
            };
          });
        })
      );
  }

  updateCategory(id: string, category: string) {
    this.firestore
      .collection('categories')
      .doc(id)
      .update({ category })
      .then(() => {
        this.toastrService.success(
          `Category ${category} updated successfully.`
        );
      });
  }
}

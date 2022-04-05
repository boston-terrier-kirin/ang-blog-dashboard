import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  form = new FormGroup({
    category: new FormControl('', [Validators.required]),
  });

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {}

  addCategory() {
    const category = { ...this.form.value };
    const subCategory = { subCategory: 'subCategory1' };

    this.firestore
      .collection('categories')
      .add(category)
      .then((docRef) => {
        console.log(docRef);
        this.firestore
          .collection('categories')
          .doc(docRef.id)
          .collection('subCategories')
          .add(subCategory)
          .then((docRef) => {
            console.log(docRef);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

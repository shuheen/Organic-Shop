import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/internal/Observable';
import { FirebaseApp } from 'angularfire2';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  identifier;
  itemsRef: Observable<any[]>;
  constructor(private db: AngularFireDatabase, private app: FirebaseApp) { }


  // addCategory(category){

  //   // this.identifier = category.name;
  //   // let mycategory = {
  //   //   identifier: category
  //   // }
  //   console.log(category);
  //  // this.db.list('/categories').push(category);
  // }

  addCategory(category) {
    let categoryIdentifier = category.category;
    const database = this.app.database().ref();
    const cat = database.child('categories').update({
      [categoryIdentifier]:{
      name: category.category
      }
    })
  }

  // transformIdentifier(categoryP){
  //   return this.capPipe.transform(categoryP);
  // }


  getCategories() {
    return this.db.list('/categories', {
      query: {
        orderByChild: 'name',
      }
    });
  }
}

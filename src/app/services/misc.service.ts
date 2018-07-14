import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class MiscService {

  constructor( private db: AngularFireDatabase) { }

  fetchCountries(){
    return this.db.list('/countries');
  }

  getCountries(batch, lastKey?) {
    let query =  {
            orderByKey: true,
            limitToFirst: batch,
          }

    if (lastKey) query['startAt'] = lastKey

    return this.db.list('/countries', {
      query
    })
  }

  fetchStates(value){
    return this.db.list('/countries/'+value)
  }
}

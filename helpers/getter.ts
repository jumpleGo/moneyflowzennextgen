import { child, get } from 'firebase/database'
import type { DatabaseReference } from '@firebase/database'

export class Getter {
  static getFromDB (databaseRef: DatabaseReference, url: string) {
    return get(child(databaseRef, url)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        console.log("No data available"+url);
      }
    }).catch((error) => {
     return error
    });
  }
}
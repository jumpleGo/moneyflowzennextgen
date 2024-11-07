import { child, get, getDatabase, query, equalTo, onValue, ref } from 'firebase/database'
import type { DatabaseReference } from '@firebase/database'

export class Getter {
  static getFromDB (url: string) {
    const { $databaseRef, $firebase } = useNuxtApp()
    return get(child($databaseRef, url)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        console.log("No data available"+url);
      }
    }).catch((error) => {
     return error
    });
  }

  static getByKey (db: string, key: string) {
    const { $databaseRef, $firebase } = useNuxtApp()

    return get(child($databaseRef, `${db}/${key}`)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        console.log("No data available");
      }
    })
  }

  static async getByValue (path: string, value: string, key?: string) {
    const { $databaseRef, $firebase } = useNuxtApp()
    console.log(getDatabase(), path, value, key)

    const request = query(child($databaseRef, path), equalTo(value))

    return get(request).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        console.log("No data available");
      }
    })
  }
}
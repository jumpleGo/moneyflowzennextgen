import {
  child,
  get,
  getDatabase,
  query,
  equalTo,
  onValue,
  ref,
  orderByChild,
  orderByValue,
  orderByPriority, orderByKey
} from 'firebase/database'
import type { DatabaseReference } from '@firebase/database'
import type { IBlogItem } from '~/types/pages/blog'

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

  static async getBlog (): Promise<IBlogItem[]> {
    const { $databaseRef, $firebase } = useNuxtApp()
    const request = query(child($databaseRef, 'blog'), orderByChild('updatedAt'))

    try {
      const snapshot = await get(request)

      if (!snapshot.exists()) {
        console.log('No data available')
        return []
      }

      const dataArr: IBlogItem[] = []

      snapshot.forEach((childSnapshot) => {
        dataArr.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        })
      })

      return dataArr

    } catch (error) {
      console.error('Ошибка получения данных:', error)
      return []
    }
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

  static async getCountByValue (path: string, key: string, value: string) {
    const { $databaseRef, $firebase } = useNuxtApp()
    const request = query(child($databaseRef, path), orderByChild('status'), equalTo(value))

    return get(request).then((snapshot) => snapshot.size)

  }

  static async getByValue (path: string, value: string, key: string) {
    const { $databaseRef } = useNuxtApp()

    const request = query(child($databaseRef, path), orderByChild(key), equalTo(value))

    return get(request).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()
      } else {
        console.log("No data available");
      }
    })
  }
}
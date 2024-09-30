import { child, get, push, set, ref, getDatabase, update } from 'firebase/database'
import type { DatabaseReference } from '@firebase/database'

export class Setter {
  static setToDb (databaseRef: DatabaseReference, url: string, data: any) {
    return set(child(databaseRef, url), data)
  }

  static async pushToDb (url: string, data: any) {
    return push(child(ref(getDatabase()), url), data)
  }

  static async updateToDb (updates: any) {
    return await update(ref(getDatabase()), updates)
  }
}
import { child, get, set } from 'firebase/database'
import type { DatabaseReference } from '@firebase/database'

export class Setter {
  static setToDb (databaseRef: DatabaseReference, url: string, data: any) {
    return set(child(databaseRef, url), data)
  }
}
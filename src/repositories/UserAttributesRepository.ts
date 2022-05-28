import { doc, getDoc, updateDoc } from "firebase/firestore";
import type { Firestore } from "firebase/firestore";

import type { UserAttributes } from "../models/User";

class UserAttributesRepository {
  private firestore: Firestore;

  private path(uid: string) {
    return `users/${uid}`;
  }

  constructor(firestore: Firestore) {
    this.firestore = firestore;
  }

  public async findUserAttributes(uid: string): Promise<UserAttributes | null> {
    const userRef = doc(this.firestore, this.path(uid));
    return getDoc(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        return Promise.resolve(snapshot.data() as UserAttributes);
      } else {
        console.debug(`No user attributes for uid: ${uid}`);
        return Promise.resolve(null);
      }
    });
  }

  /**
   *
   * @param uid
   * @param userAttributes
   * @returns
   */
  public async updateUserAttributes(uid: string, userAttributes: UserAttributes): Promise<boolean> {
    const userRef = doc(this.firestore, this.path(uid));
    return getDoc(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        updateDoc(userRef, { displayName: userAttributes.displayName });
        // userAttributesStore.update((attributes) => Object.assign({}, attributes, { displayName: userAttributes.displayName }));
        return true;
      }
      return false;
    });
  }
}

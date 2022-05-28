import { doc, getDoc, type Firestore } from "firebase/firestore";

import { Declaration } from "../models/Declaration";

class DeclarationRepository {
  private firestore: Firestore;
  private path(id: string) {
    return `declarations/${id}`;
  }

  constructor(firestore: Firestore) {
    this.firestore = firestore;
  }

  public async find(id: string): Promise<Declaration> {
    const docRef = doc(this.firestore, this.path(id))
    getDoc(docRef).then((snapshot) => {
      if (snapshot.exists()) {
        return Declaration.fromObject(snapshot.data())
      }
    })
    return Promise.resolve(null);
  }
}

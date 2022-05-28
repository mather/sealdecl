import type { EmptyEnvelope } from "./Envelope";

export class GameMaster {
  uid: string;
  displayName: string;
  email: string;

  constructor(uid: string, displayName: string, email: string) {
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
  }

  createEnvelope(name: string): EmptyEnvelope {
    return null;
  }
}

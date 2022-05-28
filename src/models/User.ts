import { GameMaster } from "./GameMaster";

export type UserAttributes = {
  displayName: string;
  email: string;
};

export class User {
  uid: string;
  displayName: string;
  email: string;

  constructor(uid: string, displayName: string, email: string) {
    this.uid = uid;
    this.displayName = displayName;
    this.email = email;
  }

  asGameMaster(): GameMaster {
    return new GameMaster(this.uid, this.displayName, this.email);
  }
}

import { createSign } from "crypto";
import { formatISO } from "date-fns";

import type { GamePlayer } from "./GamePlayer";

export class Declaration {
  declaredBy: GamePlayer;
  value: string;
  createdAt: Date;
  signature: string;
  publicKey: string;

  private constructor(
    declaredBy: GamePlayer,
    value: string,
    createdAt: Date,
    signature: string,
    publicKey: string
  ) {
    this.declaredBy = declaredBy;
    this.value = value;
    this.createdAt = createdAt;
    this.signature = signature;
    this.publicKey = publicKey;
  }

  // FIXME: Should be implemented in cloud functions.
  public static create(by: GamePlayer, value: string): Declaration {
    const now = new Date();
    const formattedDate = formatISO(now);
    const sign = createSign("RSA-SHA256");
    sign.write(`${by.uid},${value},${formattedDate}`);
    const signature = sign.sign("private_key").toString("utf8");
    return new Declaration(by, value, now, signature, "sample");
  }

  public static fromObject(obj: Object): Declaration {
    return null;
  }
}

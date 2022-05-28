import type { Declaration } from "./Declaration";
import type { GameMaster } from "./GameMaster";
import type { GamePlayer } from "./GamePlayer";

export interface Envelope {
  id: string;
  name: string;
  master: GameMaster;
  declaration?: {
    player: GamePlayer;
    signature: string;
  };
  createdAt: Date;
  status: "empty" | "declared" | "sealed" | "opened";
}

export class EmptyEnvelope implements Envelope {
  id: string;
  name: string;
  master: GameMaster;
  createdAt: Date;
  status: "empty";
}

export class DeclaredEnvelope implements Envelope {
  id: string;
  name: string;
  master: GameMaster;
  declaration: {
    player: GamePlayer;
    signature: string;
  };
  createdAt: Date;
  status: "declared";
}

export class SealedEnvelope implements Envelope {
  id: string;
  name: string;
  master: GameMaster;
  declaration: {
    player: GamePlayer;
    signature: string;
  };
  createdAt: Date;
  status: "sealed";
}

export class OpenedEnvelope implements Envelope {
  id: string;
  name: string;
  master: GameMaster;
  declaration: {
    player: GamePlayer;
    signature: string;
  };
  createdAt: Date;
  status: "opened";
}

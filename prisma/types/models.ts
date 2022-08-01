export type AccountModel = {
  id: string;
  userId: string;
  provider: string;
  type: string;
};

export type TableGame = {
  id: string;
  eventOwnerId: string;
  tableGameId: string;
  gameName: string;
  xRow: number[];
  yRow: number[];
};

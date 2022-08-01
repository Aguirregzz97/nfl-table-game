type User = {
  id: string;
  email: string;
  image: string;
  name: string;
};

export type AccountModel = {
  id: string;
  userId: string;
  provider: string;
  type: string;
};

export type TableGame = {
  id: string;
  tableGameOwnerId: string;
  tableGameOwner: User;
  gameName: string;
  xRow: number[];
  yRow: number[];
  tableSelections: TableSelection[];
};

export type TableSelection = {
  id: string;
  xSelection: number;
  ySelection: number;
  tableGameId: string;
  tableGame: TableGame;
  userId: string;
  user: User;
};

export type User = {
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
  teamA: string;
  teamB: string;
  gameDate: Date;
  xRow: number[];
  yRow: number[];
  tableSelections: TableSelection[];
  users: {
    user: User;
  }[];
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

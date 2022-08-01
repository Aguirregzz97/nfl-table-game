import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import BettingBoard from "../../../components/BettingBoard";
import LoadingAnimation from "../../../components/LoadingAnimation";
import { TableGame } from "../../../prisma/types/models";

const getTableGameData = async (tableGameId: string) => {
  return (await axios.get(`/api/table-games/${tableGameId}`)).data as TableGame;
};

const PlayerGame: NextPage = () => {
  const router = useRouter();
  const { tableGameId } = router.query;

  const { data: tableGameData } = useQuery(
    ["table-game-data"],
    async () => await getTableGameData(tableGameId as string),
  );

  if (!tableGameData) return <LoadingAnimation size="md" />;

  return (
    <div className="mt-8 ml-8">
      <h1 className="text-3xl font-bold text-skin-base sm:text-4xl mb-5">
        {tableGameData.gameName}
        <i className="fa-solid fa-football ml-3"></i>
      </h1>
      <BettingBoard
        randNumsX={tableGameData.xRow}
        randNumsY={tableGameData.yRow}
        boardSelections={tableGameData.tableSelections}
      />
    </div>
  );
};

export default PlayerGame;

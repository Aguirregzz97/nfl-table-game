import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import BettingBoard from "../../../components/BettingBoard";
import LoadingAnimation from "../../../components/LoadingAnimation";
import CountdownTimer from "../../../components/TimerComponents/CountdownTimer";
import { TableGame } from "../../../prisma/types/models";
import { requireAuth } from "../../../utils/requireAuth";

const getTableGameData = async (tableGameId: string) => {
  return (await axios.get(`/api/table-games/${tableGameId}`)).data as TableGame;
};

const PlayerGame: NextPage = () => {
  const router = useRouter();
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const { tableGameId } = router.query;

  const { data: tableGameData } = useQuery(
    ["table-game-data"],
    async () => await getTableGameData(tableGameId as string),
  );

  if (!tableGameData) return <LoadingAnimation size="md" />;

  let gameDate = new Date(tableGameData.gameDate);

  return (
    <div className="mt-8 ml-8">
      <h1 className="text-3xl font-bold text-skin-base sm:text-4xl mb-8">
        {tableGameData.teamA} - {tableGameData.teamB}
        <i className="fa-solid fa-football ml-3"></i>
      </h1>
      <CountdownTimer
        setTimerExpired={() => setGameStarted(true)}
        TimerExpiredNotice={
          <h1 className="font-bold text-3xl mb-8 text-red-500">
            Tiles are closed, game already started!
          </h1>
        }
        targetDate={gameDate.toISOString()}
      />
      {!gameStarted && (
        <h1 className="font-bold text-2xl text-color-base mb-8">
          Buy a random tile!
        </h1>
      )}
      <BettingBoard
        randNumsX={tableGameData.xRow}
        randNumsY={tableGameData.yRow}
        tableGameData={tableGameData}
      />
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  return requireAuth(context, (session) => {
    return {
      props: { session },
    };
  });
}

export default PlayerGame;

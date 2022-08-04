import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import Border from "../../../../components/Border";
import Button from "../../../../components/Button";
import LoadingAnimation from "../../../../components/LoadingAnimation";
import CountdownTimer from "../../../../components/TimerComponents/CountdownTimer";
import { TableGame } from "../../../../prisma/types/models";
import { requireAuth } from "../../../../utils/requireAuth";

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
      <h1 className="text-3xl font-bold text-skin-base sm:text-4xl">
        {tableGameData.teamA} - {tableGameData.teamB}
        <i className="fa-solid fa-football ml-3"></i>
        <br />
        <Border />
        <p className="text-2xl font-semibold">
          <span className="font-bold">admin:</span>{" "}
          {tableGameData.tableGameOwner.name}
          <i className="ml-2 fa-solid fa-hammer text-color-base" />
        </p>
      </h1>
      <Border />
      <div className="flex gap-8">
        <Button onClick={() => router.push(`${router.asPath}/participants`)}>
          View Participants
        </Button>
        <Button onClick={() => router.push(`${router.asPath}/board`)}>
          View Board
        </Button>
      </div>
      <Border />
      <CountdownTimer
        setTimerExpired={() => setGameStarted(true)}
        TimerExpiredNotice={
          <h1 className="font-bold text-3xl mb-8 text-red-500">
            Tiles are closed, game already started!
          </h1>
        }
        targetDate={gameDate.toISOString()}
      />
      <Border />
      {!gameStarted && (
        <>
          <h1 className="font-bold text-2xl text-color-base mb-8">
            Buy a random tile!
          </h1>
          <Border />
        </>
      )}
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

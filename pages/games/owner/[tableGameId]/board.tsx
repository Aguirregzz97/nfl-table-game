import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import BettingBoard from "../../../../components/BettingBoard";
import Border from "../../../../components/Border";
import LoadingAnimation from "../../../../components/LoadingAnimation";
import { TableGame } from "../../../../prisma/types/models";
import { requireAuth } from "../../../../utils/requireAuth";

const getTableGameData = async (tableGameId: string) => {
  return (await axios.get(`/api/table-games/${tableGameId}`)).data as TableGame;
};

const User: NextPage = () => {
  const router = useRouter();
  const { tableGameId } = router.query;

  const { data: tableGameData } = useQuery(
    ["table-game-data"],
    async () => await getTableGameData(tableGameId as string),
  );

  if (!tableGameData) return <LoadingAnimation size="md" />;

  return (
    <div className="mt-8 ml-8">
      <h1 className="text-3xl font-bold text-skin-base sm:text-4xl">
        {tableGameData.teamA} - {tableGameData.teamB} | board
        <i className="fa-solid fa-table-cells ml-4"></i>
      </h1>
      <Border />
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

export default User;

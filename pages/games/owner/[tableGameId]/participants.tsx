import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage, NextPageContext } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Border from "../../../../components/Border";
import Card from "../../../../components/Card";
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
        {tableGameData.teamA} - {tableGameData.teamB} | participants
        <i className="fa-solid fa-users ml-4" />
      </h1>
      <Border />
      <div className="flex gap-8 flex-wrap">
        {tableGameData.users.map((participant) => {
          return (
            <Card key={participant.user.id}>
              <div className="flex justify-center">
                <Image
                  className="rounded-full"
                  width={95}
                  height={95}
                  alt="image placeholder"
                  src={participant.user.image || ""}
                />
              </div>
              <div className="font-bold text-lg mb-2 mt-2">
                {participant.user.name}
              </div>
              <p className="text-gray-700 text-base self-center">
                {participant.user.email}
              </p>
            </Card>
          );
        })}
      </div>
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

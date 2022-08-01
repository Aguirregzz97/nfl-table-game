import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { NextPage, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import LoadingAnimation from "../../components/LoadingAnimation";
import { TableGame } from "../../prisma/types/models";
import Card from "../../components/Card";
import { requireAuth } from "../../utils/requireAuth";

const getOwnedGames = async (userId: string | undefined) => {
  return (await (
    await axios.post("/api/table-games/owner", { userId })
  ).data) as TableGame[];
};

const Games: NextPage = () => {
  const { data: session } = useSession();

  const { data: ownedGames } = useQuery(
    ["owned-games"],
    async () => await getOwnedGames(session?.user.id),
    { enabled: !!session },
  );

  if (!session || !ownedGames) return <LoadingAnimation size="md" />;

  return (
    <div className="mt-8 ml-8">
      <h1 className="text-3xl font-bold text-skin-base sm:text-4xl">
        Owned Games
      </h1>
      {ownedGames.map((ownedGame) => {
        return (
          <Card key={ownedGame.id}>
            <div className="flex flex-col items-center">
              <div className="font-bold text-xl mb-2 mt-2">
                {ownedGame.gameName}
              </div>
            </div>
          </Card>
        );
      })}
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

export default Games;

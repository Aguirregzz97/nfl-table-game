import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { NextPage, NextPageContext } from "next";
import { useSession } from "next-auth/react";
import LoadingAnimation from "../../components/LoadingAnimation";
import { TableGame } from "../../prisma/types/models";
import Card from "../../components/Card";
import { requireAuth } from "../../utils/requireAuth";
import { useRouter } from "next/router";
import TextInput from "../../components/FormComponents/TextInput";
import Border from "../../components/Border";

const getOwnedGames = async (userId: string | undefined) => {
  return (await (
    await axios.post("/api/table-games/owner", { userId })
  ).data) as TableGame[];
};

const getPlayerGames = async (userId: string | undefined) => {
  return (await (
    await axios.post("/api/table-games/player", { userId })
  ).data) as TableGame[];
};

const Games: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const { data: ownedGames } = useQuery(
    ["owned-games"],
    async () => await getOwnedGames(session?.user.id),
    { enabled: !!session },
  );

  const { data: playerGames } = useQuery(
    ["player-games"],
    async () => await getPlayerGames(session?.user.id),
    { enabled: !!session },
  );

  if (!session || !ownedGames || !playerGames)
    return <LoadingAnimation size="md" />;

  return (
    <div className="mt-8 ml-8">
      <h1 className="text-3xl font-bold text-skin-base sm:text-4xl">
        Player Games <i className="fa-solid fa-football ml-1"></i>
      </h1>
      <div className="flex gap-5 flex-wrap">
        {playerGames.map((playerGame) => {
          return (
            <Card
              clickable
              onClick={() =>
                router.push(`${router.asPath}/player/${playerGame.id}`)
              }
              key={playerGame.id}
            >
              <div className="flex flex-col items-center">
                <div className="font-bold text-xl mb-2 mt-2">
                  {playerGame.teamA} - {playerGame.teamB}
                </div>
                <p className="text-lg mt-2">
                  admin:
                  <span className="font-bold text-lg">
                    {" "}
                    {playerGame.tableGameOwner.name}{" "}
                    {session.user.id === playerGame.tableGameOwnerId
                      ? "(you)"
                      : ""}
                  </span>
                </p>
              </div>
            </Card>
          );
        })}
        <div>
          {playerGames?.length === 0 && (
            <>
              <p className="text-color-base mt-6 text-lg">
                - You currently are not playing in any games
              </p>
              <p className="text-color-base mt-2 text-lg">
                - Check your{" "}
                <span className="font-bold">
                  invites inbox{" "}
                  <i className="fa-solid fa-inbox text-color-base" />
                </span>{" "}
                to see if someone has invited you to a game
              </p>
            </>
          )}
        </div>
      </div>
      <Border />
      <h1 className="text-3xl font-bold text-skin-base sm:text-4xl">
        Owned Games <i className="fa-solid fa-hammer ml-1"></i>
      </h1>
      <div className="flex gap-5 flex-wrap">
        {ownedGames.map((ownedGame) => {
          return (
            <Card
              onClick={() =>
                router.push(`${router.asPath}/owner/${ownedGame.id}`)
              }
              clickable
              key={ownedGame.id}
            >
              <div className="flex flex-col items-center">
                <p className="font-bold text-xl mb-2 mt-2">
                  {ownedGame.teamA} - {ownedGame.teamB}
                </p>
              </div>
            </Card>
          );
        })}
        {ownedGames?.length === 0 && (
          <p className="text-color-base mt-4 text-lg">
            - You currently own no games
          </p>
        )}
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

export default Games;

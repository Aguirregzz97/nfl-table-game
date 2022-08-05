import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import Border from "../../../../components/Border";
import Button from "../../../../components/Button";
import EditGameForm, {
  EditGameFormBody,
  editGameFormSchema,
} from "../../../../components/FormComponents/Forms/EditGameForm";
import LoadingAnimation from "../../../../components/LoadingAnimation";
import Modal from "../../../../components/Modal";
import CountdownTimer from "../../../../components/TimerComponents/CountdownTimer";
import { TableGame } from "../../../../prisma/types/models";
import { requireAuth } from "../../../../utils/requireAuth";

const getTableGameData = async (tableGameId: string) => {
  return (await axios.get(`/api/table-games/${tableGameId}`)).data as TableGame;
};

const updateGame = async (
  formValues: EditGameFormBody & { tableGameId: string },
) => {
  const formatedDate: Date = new Date(
    `${formValues.gameDate} ${formValues.gameTime}`,
  );
  const isoDate = formatedDate.toISOString();

  const values = {
    teamA: formValues.teamA,
    teamB: formValues.teamB,
    gameDate: isoDate,
    tableGameId: formValues.tableGameId,
  };

  return await axios.post("/api/table-games/edit", values);
};

const getInitialEditGameDataValues = (
  tableGameData: TableGame,
): EditGameFormBody => {
  let gameDate = new Date(tableGameData.gameDate);

  const gameDateFormated = format(gameDate, "MM/dd/yyyy");
  const gameTimeFormated = format(gameDate, "HH':'mm");

  return {
    teamA: tableGameData.teamA,
    teamB: tableGameData.teamB,
    gameDate: gameDateFormated,
    gameTime: gameTimeFormated,
  };
};

const PlayerGame: NextPage = () => {
  const router = useRouter();
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [editGameOpen, setEditGameOpen] = useState<boolean>(false);
  const { tableGameId } = router.query;

  const { data: tableGameData, refetch } = useQuery(
    ["table-game-data"],
    async () => await getTableGameData(tableGameId as string),
  );

  const { isLoading, mutate } = useMutation(
    async (formValues: EditGameFormBody) => {
      await updateGame({
        ...formValues,
        tableGameId: tableGameData?.id as string,
      });
    },
    {
      onError: (error: any) => {
        console.log(error);
        toast.error(
          `Something went wrong ${error.message}\n server message: ${error.response.data.message}`,
        );
      },
      onSuccess: async () => {
        toast.success("updated game succesfully!");
        setEditGameOpen(false);
        refetch();
      },
    },
  );

  if (!tableGameData) return <LoadingAnimation size="md" />;

  let gameDate = new Date(tableGameData.gameDate);

  return (
    <>
      <Modal
        close={() => setEditGameOpen(false)}
        title="Edit Game"
        isOpen={editGameOpen}
      >
        <Formik
          initialValues={getInitialEditGameDataValues(tableGameData)}
          onSubmit={(values) => mutate(values)}
          validationSchema={editGameFormSchema}
          validateOnChange={false}
          validateOnBlur={false}
        >
          <Form className="flex flex-col">
            <EditGameForm />
            <Button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 mt-4"
              loading={isLoading}
            >
              Update
            </Button>
          </Form>
        </Formik>
      </Modal>
      <div className="mt-8 ml-8">
        <h1 className="text-3xl font-bold text-skin-base sm:text-4xl">
          {tableGameData.teamA} - {tableGameData.teamB}
          <i className="fa-solid fa-hammer ml-3"></i>
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
        <div className="flex items-center gap-8">
          <h1 className="text-3xl font-bold text-skin-base sm:text-4xl">
            Event Date
            <i className="fa-solid fa-calendar-day ml-3" />
          </h1>
        </div>
        <p className="text-lg font-semibold text-skin-base mt-4">
          {gameDate.toString()}
        </p>
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
        <Button
          onClick={() => setEditGameOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-600"
        >
          Edit
        </Button>
      </div>
    </>
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

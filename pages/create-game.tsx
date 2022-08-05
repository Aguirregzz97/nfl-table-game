import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Border from "../components/Border";
import Button from "../components/Button";
import CreateGameForm, {
  CreateGameFormBody,
  createGameFormInitialValues,
  createGameFormSchema,
} from "../components/FormComponents/Forms/CreateGameForm";
import LoadingAnimation from "../components/LoadingAnimation";

const createGame = async (
  formValues: CreateGameFormBody & { ownerId: string },
) => {
  const formatedDate: Date = new Date(
    `${formValues.gameDate} ${formValues.gameTime}`,
  );
  const isoDate = formatedDate.toISOString();

  const values = {
    teamA: formValues.teamA,
    teamB: formValues.teamB,
    gameDate: isoDate,
    ownerId: formValues.ownerId,
  };

  return await axios.post("/api/table-games/create", values);
};

const CreateGame: NextPage = () => {
  const session = useSession();

  const { isLoading, mutate } = useMutation(
    async (formValues: CreateGameFormBody & { ownerId: string }) => {
      await createGame(formValues);
    },
    {
      onError: (error: any) => {
        console.log(error);
        toast.error(
          `Something went wrong ${error.message}\n server message: ${error.response.data.message}`,
        );
      },
      onSuccess: async () => {
        toast.success("created game succesfully!");
      },
    },
  );

  if (!session) return <LoadingAnimation size="md" />;

  return (
    <div className="mt-8 ml-8">
      <h1 className="text-3xl font-bold text-skin-base sm:text-4xl">
        Create Game <i className="fa-solid fa-calendar-plus ml-3" />
      </h1>
      <Border />
      <p className="text-slate-800 font-semibold text-md">
        Please make sure of the following: <br />
        <i className="fa-solid fa-circle text-[0.6rem]" /> Use a 24 hour format
        (14:00 = 2:00 pm) <br />{" "}
        <i className="fa-solid fa-circle text-[0.6rem]" /> make sure your
        machine has the correct time zone
      </p>
      <Border />
      <Formik
        initialValues={createGameFormInitialValues}
        onSubmit={(values) =>
          mutate({ ...values, ownerId: session.data?.user.id as string })
        }
        validationSchema={createGameFormSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <Form className="flex flex-col">
          <CreateGameForm />
          <Button loading={isLoading} className="mt-4" type="submit">
            Create Game
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateGame;

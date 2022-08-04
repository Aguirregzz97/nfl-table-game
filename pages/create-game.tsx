import { Form, Formik } from "formik";
import { NextPage } from "next";
import Border from "../components/Border";
import Button from "../components/Button";
import CreateGameForm, {
  createGameFormInitialValues,
  createGameFormSchema,
} from "../components/FormComponents/Forms/CreateGameForm";

const CreateGame: NextPage = () => {
  return (
    <div className="mt-8 ml-8">
      <h1 className="text-3xl font-bold text-skin-base sm:text-4xl">
        Create Game <i className="fa-solid fa-calendar-plus ml-3" />
      </h1>
      <Border />
      <Formik
        initialValues={createGameFormInitialValues}
        onSubmit={() => {
          console.log("submited");
        }}
        validationSchema={createGameFormSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <Form className="flex flex-col">
          <CreateGameForm />
          <Button className="mt-4" type="submit">
            Create Game
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateGame;

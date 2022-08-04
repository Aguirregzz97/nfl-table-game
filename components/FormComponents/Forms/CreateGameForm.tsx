import react from "react";
import * as Yup from "yup";
import { useFormikContext } from "formik";
import TextInput, { getInputState } from "../TextInput";

export type CreateGameFormBody = {
  teamA: string;
  teamB: string;
};

export const createGameFormInitialValues: CreateGameFormBody = {
  teamA: "",
  teamB: "",
};

export const createGameFormSchema = Yup.object().shape({
  teamA: Yup.string().required("team a is required"),
  teamB: Yup.string().required("team b is required"),
});

const CreateGameForm: React.FC = () => {
  const { errors, touched, values, handleChange } =
    useFormikContext<CreateGameFormBody>();

  return (
    <div className="grid sm:grid-cols-2 gap-4 sm:min-w-[29rem]">
      <TextInput
        id="teamA"
        label="Team A"
        type="text"
        errorMessage={errors.teamA}
        value={values.teamA}
        onChange={handleChange}
        state={getInputState(
          touched.teamA !== undefined,
          errors.teamA !== undefined,
        )}
      />
      <TextInput
        id="teamB"
        label="Team B"
        type="text"
        errorMessage={errors.teamB}
        value={values.teamB}
        onChange={handleChange}
        state={getInputState(
          touched.teamB !== undefined,
          errors.teamB !== undefined,
        )}
      />
    </div>
  );
};

export default CreateGameForm;

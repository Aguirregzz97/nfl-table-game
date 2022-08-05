import react from "react";
import * as Yup from "yup";
import { useFormikContext } from "formik";
import TextInput, { getInputState } from "../TextInput";

export type EditGameFormBody = {
  teamA: string;
  teamB: string;
  gameDate: string;
  gameTime: string;
};

export const editGameFormSchema = Yup.object().shape({
  teamA: Yup.string().required("team a is required"),
  teamB: Yup.string().required("team b is required"),
  gameDate: Yup.string()
    .required("game date is required")
    .matches(
      /^(1[0-2]|0[1-9])\/(3[01]|[12][0-9]|0[1-9])\/[0-9]{4}$/,
      "date format invalid",
    ),
  gameTime: Yup.string()
    .required("game time is required")
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]/, "time format invalid"),
});

const EditGameForm: React.FC = () => {
  const { errors, touched, values, handleChange } =
    useFormikContext<EditGameFormBody>();

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
        placeholder="dallas"
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
        placeholder="houston"
      />
      <TextInput
        id="gameDate"
        label="Game Date"
        type="text"
        errorMessage={errors.gameDate}
        value={values.gameDate}
        onChange={handleChange}
        state={getInputState(
          touched.gameDate !== undefined,
          errors.gameDate !== undefined,
        )}
        placeholder="MM/DD/YYYY"
      />
      <TextInput
        id="gameTime"
        label="Game Time"
        type="text"
        errorMessage={errors.gameTime}
        value={values.gameTime}
        onChange={handleChange}
        state={getInputState(
          touched.gameTime !== undefined,
          errors.gameTime !== undefined,
        )}
        placeholder="HH:MM"
      />
    </div>
  );
};

export default EditGameForm;

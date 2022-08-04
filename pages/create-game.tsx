import { NextPage } from "next";

const CreateGame: NextPage = () => {
  return (
    <div className="mt-8 ml-8">
      <h1 className="text-3xl font-bold text-skin-base sm:text-4xl">
        Create Game <i className="fa-solid fa-calendar-plus ml-3" />
      </h1>
    </div>
  );
};

export default CreateGame;

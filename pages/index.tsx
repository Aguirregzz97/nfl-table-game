import { NextPage } from "next";
import { signOut } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <div>
      <h1>this is home</h1>
      <button onClick={() => signOut()}>sign out</button>
    </div>
  );
};

export default Home;

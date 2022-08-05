import { NextPage, NextPageContext } from "next";
import { requireAuth } from "../utils/requireAuth";

const Invites: NextPage = () => {
  return <div>this is invites page</div>;
};

export default Invites;

export async function getServerSideProps(context: NextPageContext) {
  return requireAuth(context, (session) => {
    return {
      props: { session },
    };
  });
}

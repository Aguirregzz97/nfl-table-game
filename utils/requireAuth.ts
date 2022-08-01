import { NextPageContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export const requireAuth = async (
  context: NextPageContext,
  cb: (session: Session) => {},
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return cb(session);
};

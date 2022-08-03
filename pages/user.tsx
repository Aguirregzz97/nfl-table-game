import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { NextPage, NextPageContext } from "next";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Button from "../components/Button";
import Card from "../components/Card";
import LoadingAnimation from "../components/LoadingAnimation";
import { AccountModel } from "../prisma/types/models";
import { requireAuth } from "../utils/requireAuth";

const getUserAccount = async (
  session: Session | null,
): Promise<AccountModel> => {
  return await (
    await axios.post("/api/user-account", { userId: session?.user.id })
  ).data;
};

const User: NextPage = () => {
  const { data: session } = useSession();

  const { data: account } = useQuery(
    ["user-account"],
    async () => await getUserAccount(session),
    { enabled: !!session },
  );

  if (!session || !account) return <LoadingAnimation size="md" />;

  return (
    <div className="mt-8 ml-8">
      <h1 className="text-3xl font-bold text-skin-base sm:text-4xl">Account</h1>
      <Card>
        <div className="flex justify-center mt-4">
          <Image
            className="rounded-full"
            width={110}
            height={110}
            alt="image placeholder"
            src={session?.user?.image || ""}
          />
        </div>

        <div className="font-bold text-xl mb-2 mt-2">{session.user?.name}</div>
        <p className="text-gray-700 text-base">- {session.user?.email}</p>
        <p className="text-gray-700 text-base">
          - Account Provider:{" "}
          <span className="font-bold">{account?.provider}</span>
        </p>
        <Button onClick={() => signOut()}>Log Out</Button>
      </Card>
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

export default User;

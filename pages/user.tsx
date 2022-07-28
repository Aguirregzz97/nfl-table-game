import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Card from "../components/Card";

const User: NextPage = () => {
  const { data: session } = useSession();

  if (!session) return <p>loading...</p>;

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

        <div className="font-bold text-xl mb-2">{session.user?.name}</div>
        <p className="text-gray-700 text-base">{session.user?.email}</p>
        <button
          onClick={() => signOut()}
          className="mt-8 text-skin-inverted bg-color-base
										hover:bg-skin-button-muted flex items-center
										justify-center px-4 py-3 border border-transparent
										text-base font-medium rounded-md shadow-sm sm:px-8"
        >
          Log Out
        </button>
      </Card>
    </div>
  );
};

export default User;

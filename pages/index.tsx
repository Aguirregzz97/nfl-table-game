import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";

const Login: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
      {session && (
        <>
          <>
            Signed in as {session.user?.email} <br />
            <button onClick={() => signOut()}>Sign Out</button>
          </>
        </>
      )}
    </>
  );
};

export default Login;

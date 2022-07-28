import { NextPage, NextPageContext } from "next";
import { useSession, signIn, getSession } from "next-auth/react";

const Login: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div className="p-36 flex justify-center h-screen w-full bg-skin-fill">
      <div className="flex flex-col items-center bg-skin-div-accent sm:w-[26rem] h-[16rem] rounded-xl min-w-[22rem]">
        <h2 className="pt-8 text-3xl font-bold text-skin-base sm:text-4xl">
          Login
        </h2>
        {!session && (
          <>
            <p className="mt-6 text-lg leading-6 text-skin-base">
              Please Login with any of our providers
            </p>
            <button
              onClick={() => signIn()}
              className="mt-8 text-skin-inverted bg-color-base
										hover:bg-skin-button-muted flex items-center
										justify-center px-4 py-3 border border-transparent
										text-base font-medium rounded-md shadow-sm sm:px-8"
            >
              Log in
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default Login;

import React, { ReactNode, useEffect, useRef } from "react";

const Modal: React.FC<{
  children?: ReactNode;
  title: string;
  isOpen: boolean;
  close: () => void;
}> = ({ children, title, isOpen, close }) => {
  useEffect(() => {
    const closeListener = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", closeListener);
    return () => window.removeEventListener("keydown", closeListener);
  }, []);

  return (
    <>
      {isOpen ? (
        <>
          <div
            onClick={() => close()}
            className="animate-pop-up justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="relative w-auto my-6 mx-auto max-w-3xl"
            >
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t text-color-base font-bold">
                  <h3 className="text-3xl font-semibold mr-12">{title}</h3>
                  <button className="p-1 ml-auto" onClick={close}>
                    <i className="fa-solid fa-circle-xmark text-color-base text-3xl" />
                  </button>
                </div>
                <div className="p-5">{children}</div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;

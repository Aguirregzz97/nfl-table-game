import React from "react";
import Popup from "reactjs-popup";
import { TableSelection } from "../prisma/types/models";

type BoardGameRow = {
  randNumY: number;
  selectedBy: string[]; // userIds
};

const findUserSelection = (
  currXRandNum: number,
  currYRandNum: number,
  boardSelections: TableSelection[],
) => {
  for (let i = 0; i < boardSelections.length; i++) {
    if (
      boardSelections[i].xSelection === currXRandNum &&
      boardSelections[i].ySelection === currYRandNum
    ) {
      return boardSelections[i].userId;
    }
  }
  return "available";
};

const constructRows = (
  randNumsX: number[],
  randNumsY: number[],
  boardSelections: TableSelection[],
) => {
  const rows: BoardGameRow[] = [];
  for (let j = 0; j < randNumsY.length; j++) {
    let tmpRow: BoardGameRow = { randNumY: randNumsY[j], selectedBy: [] };
    for (let i = 0; i < randNumsX.length; i++) {
      tmpRow.selectedBy.push(
        findUserSelection(randNumsX[i], randNumsY[j], boardSelections),
      );
    }
    rows.push(tmpRow);
  }
  return rows;
};

type BettingBoardProps = {
  randNumsX: number[];
  randNumsY: number[];
  boardSelections: TableSelection[];
};

const BettingBoard: React.FC<BettingBoardProps> = ({
  randNumsX,
  randNumsY,
  boardSelections,
}) => {
  const rows = constructRows(randNumsX, randNumsY, boardSelections);
  return (
    <table className="w-full text-md text-left text-white rounded-lg">
      <thead className="text-md bg-color-base">
        <tr>
          <th
            colSpan={12}
            scope="col"
            className="py-3 px-6 text-center rounded-lg rounded-bl-none"
          >
            Team B
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className=" bg-color-base text-center">
          <th
            rowSpan={11}
            scope="row"
            className="max-w-[4rem] font-medium rotate-[-90deg] rounded-bl-lg"
          >
            Team A
          </th>
          <td className="bg-white"></td>
          {randNumsX.map((randNumX) => {
            return (
              <td
                key={randNumX}
                className="font-bold py-4 px-6 bg-white text-color-base w-[1] border-b border-gray-900"
              >
                {randNumX}
              </td>
            );
          })}
        </tr>

        {rows.map((row, index) => {
          return (
            <tr className="bg-gray-700 text-center" key={row.randNumY}>
              <td className="py-4 px-6 bg-color-white text-color-base border-r border-gray-900 font-bold">
                {row.randNumY}
              </td>
              {row.selectedBy.map((selection, index) => (
                <Popup
                  key={index}
                  trigger={
                    <td className="py-6 px-6 border-4 border-white break-words w-20 h-20 hover:scale-110 hover:cursor-pointer transition">
                      {selection !== "available" && (
                        <i className="fa-solid fa-user-check text-2xl"></i>
                      )}
                      {selection === "available" && (
                        <i className="fa-solid fa-money-bill-wave text-2xl text-green-500"></i>
                      )}
                    </td>
                  }
                  modal
                  nested
                >
                  <div className="modal bg-color-base rounded-lg max-w-[40rem]">
                    <button className="close border-none " onClick={close}>
                      <i className="fa-solid fa-circle-xmark text-white text-3xl absolute top-0 right-0 mr-2 mt-2" />
                    </button>
                    <h1 className="text-white font-bold text-3xl mb-2 pb-2 text-center border-b-2">
                      Modal Title
                    </h1>
                    <div className="text-white p-10">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Atque, a nostrum. Dolorem, repellat quidem ut, minima sint
                      vel eveniet quibusdam voluptates delectus doloremque,
                      explicabo tempore dicta adipisci fugit amet dignissimos?
                      <br />
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Consequatur sit commodi beatae optio voluptatum sed eius
                      cumque, delectus saepe repudiandae explicabo nemo nam
                      libero ad, doloribus, voluptas rem alias. Vitae?
                    </div>
                  </div>
                </Popup>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BettingBoard;

import Image from "next/image";
import React, { useState } from "react";
import { TableGame, TableSelection, User } from "../prisma/types/models";
import Modal from "./Modal";

const emptySelection: SelectedBy = {
  id: "",
  email: "",
  name: "",
  image: "",
  tileSelected: "",
};

type SelectedBy = User & { tileSelected: string };

type BoardGameRow = {
  randNumY: number;
  selectedBy: SelectedBy[]; // userIds
};

const findUserSelection = (
  currXRandNum: number,
  currYRandNum: number,
  boardSelections: TableSelection[],
): SelectedBy => {
  for (let i = 0; i < boardSelections.length; i++) {
    if (
      boardSelections[i].xSelection === currXRandNum &&
      boardSelections[i].ySelection === currYRandNum
    ) {
      const tileSelected = `${currXRandNum} - ${currYRandNum}`;
      return { ...boardSelections[i].user, tileSelected };
    }
  }
  return emptySelection;
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
  tableGameData: TableGame;
};

const BettingBoard: React.FC<BettingBoardProps> = ({
  randNumsX,
  randNumsY,
  tableGameData,
}) => {
  const rows = constructRows(
    randNumsX,
    randNumsY,
    tableGameData.tableSelections,
  );

  const [currentSelection, setCurrentSelection] = useState<
    SelectedBy | undefined
  >(undefined);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Modal
        close={() => setOpen(false)}
        title={`Tile (${currentSelection?.tileSelected})`}
        isOpen={open}
      >
        <div className="flex flex-col items-center">
          <Image
            className="rounded-full"
            width={110}
            height={110}
            alt="image placeholder"
            src={currentSelection?.image || ""}
          />
          <h1 className="text-3xl font-semibold text-color-base mt-2 mb-2">
            {currentSelection?.name}
          </h1>
          <p className="my-4 text-color-base text-lg leading-relaxed">
            This tile: {currentSelection?.tileSelected} belongs to{" "}
            {currentSelection?.name}
          </p>
        </div>
      </Modal>
      <table className="w-full text-md text-left text-white rounded-lg mb-8">
        <thead className="text-md bg-color-base">
          <tr>
            <th
              colSpan={12}
              scope="col"
              className="py-3 px-6 text-center rounded-lg rounded-bl-none"
            >
              {tableGameData.teamB}
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
              {tableGameData.teamA}
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

          {rows.map((row) => {
            return (
              <tr className="bg-slate-700 text-center" key={row.randNumY}>
                <td className="py-4 px-6 bg-color-white text-color-base border-r border-gray-900 font-bold">
                  {row.randNumY}
                </td>
                {row.selectedBy.map((selection, index) => (
                  <td
                    key={index}
                    className="py-6 px-6 border-4 border-white break-words w-20 h-20"
                  >
                    {selection?.id !== "" && (
                      <i
                        onClick={() => {
                          setCurrentSelection(selection);
                          setOpen(true);
                        }}
                        className="fa-solid fa-user-check text-2xl hover:scale-110 hover:cursor-pointer transition"
                      ></i>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default BettingBoard;

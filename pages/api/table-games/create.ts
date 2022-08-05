import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { generateRandomArray } from "../../../utils/generateRandomArray";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { teamA, teamB, gameDate, ownerId } = req.body;

  const xRow = generateRandomArray();
  const yRow = generateRandomArray();

  try {
    const tableGame = await prisma.tableGame.create({
      data: {
        teamA,
        teamB,
        gameDate,
        tableGameOwnerId: ownerId,
        xRow,
        yRow,
      },
    });

    return res
      .status(200)
      .json({ tableGame, message: "created table game successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

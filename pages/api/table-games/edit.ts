import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { generateRandomArray } from "../../../utils/generateRandomArray";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { teamA, teamB, gameDate, tableGameId } = req.body;

  try {
    const tableGame = await prisma.tableGame.update({
      where: {
        id: tableGameId,
      },
      data: {
        teamA,
        teamB,
        gameDate,
      },
    });

    return res
      .status(200)
      .json({ tableGame, message: "updated table game successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

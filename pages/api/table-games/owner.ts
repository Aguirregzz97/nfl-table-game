import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = req.body;

  const gamesOwned = await prisma.tableGame.findMany({
    where: {
      tableGameOwnerId: userId,
    },
  });

  return res.status(200).json(gamesOwned);
}

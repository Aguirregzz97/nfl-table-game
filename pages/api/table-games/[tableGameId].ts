import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { tableGameId } = req.query;

  if (!tableGameId) {
    return res.status(500).json({ message: "no table game id provided" });
  }

  const tableGame = await prisma.tableGame.findFirst({
    where: {
      id: tableGameId as string,
    },
    include: {
      tableGameOwner: true,
      users: {
        include: {
          user: true,
        },
      },
      tableSelections: {
        include: {
          user: true,
        },
      },
    },
  });

  return res.status(200).json(tableGame);
}

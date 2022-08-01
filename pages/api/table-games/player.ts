import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = req.body;

  const gamesParticipatingIn = await prisma.tableGame.findMany({
    where: { users: { some: { userId } } },
    include: { tableGameOwner: true },
  });

  return res.status(200).json(gamesParticipatingIn);
}

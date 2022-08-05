import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { tableGameId } = req.query;

  try {
    const tableGame = await prisma.tableGame.delete({
      where: { id: tableGameId as string },
    });

    return res
      .status(200)
      .json({ tableGame, message: "deleted table game successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
}

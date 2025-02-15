import type { NextApiRequest, NextApiResponse } from "next";
const PublishedItem = require("../../../db/models/publishedItem");
const sequelize = require("../../../db/config");

async function getPublishedItemTrending() {
  try {
    const res = await sequelize.query(
      `SELECT publisheditem.id, publisheditem.likes, image.imageUrl, user.username, user.id AS userId, user.profilePicUrl FROM publisheditem INNER JOIN image ON publisheditem.imageId=image.id INNER JOIN user ON publisheditem.userId=user.id WHERE DATEDIFF(publisheditem.date, now())<7 ORDER BY publisheditem.likes DESC LIMIT 10 `,
      {
        type: sequelize.QueryTypes.SELECT,
      }
    );
    return res;
  } catch (err) {
    return err;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<typeof PublishedItem>
) {
  try {
    const data = await getPublishedItemTrending();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}

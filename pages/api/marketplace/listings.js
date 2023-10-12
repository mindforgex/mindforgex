import { getMarketplace } from "../../../utils/apiAxios";

const handler = async(req, res) => {
  const { page, size } = req.query;
  const { result } = await getMarketplace({ page, size });
  res.status(200).json({ result: result })
}

export default handler;

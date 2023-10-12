import { encodeListingNFT } from "../../../utils/apiAxios";

const handler = async(req, res) => {
  const { network, nft_address, sender } = req.body;
  const response = await encodeListingNFT({
    network,
    nft_address,
    sender,
    receiver: process.env.NEXT_PUBLIC_ADMIN_WALLET
  });
  res.status(200).json({ result: response });
}

export default handler;

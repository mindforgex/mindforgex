import axios from "axios";

const SHYFT_API_URL = {
  ACTIVE_LISTINGS: '/sol/v2/marketplace/active_listings',
  LISTING_NFT: '/sol/v1/nft/compressed/transfer'
};

const paramsActiveListings = {
  network: process.env.NEXT_PUBLIC_NETWORK,
  marketplace_address: process.env.NEXT_PUBLIC_MARKET_ADDRESS,
  sort_by: 'list_date',
  sort_order: 'desc',
  page: 1,
  size: 24
};

const paramsListingNFT = {
  network: process.env.NEXT_PUBLIC_NETWORK,
  marketplace_address: process.env.NEXT_PUBLIC_MARKET_ADDRESS,
  nft_address: "",
  price: 200,
  seller_wallet: ""
}

const shyftApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SHYFT_URL,
  headers: { 'x-api-key': process.env.NEXT_PUBLIC_SHYFT_API, "Content-Type": "application/json" },
});

const transformALParams = (params, { page, size }) => ({...params, page, size });
const transformListingParams = (params, { nft_address, price, seller_wallet }) => ({...params, nft_address, price, seller_wallet });

export const getMarketplace = async({ page, size }) => {
  try {
    const { data } = await shyftApi.get(SHYFT_API_URL.ACTIVE_LISTINGS, { params: transformALParams(paramsActiveListings, {page, size}) })
    return data
  } catch (err) {
    console.log(err.response.data)
  }
};

export const encodeListingNFT = async({ network, nft_address, sender, receiver }) => {
  try {
    const { data } = await shyftApi.post(
      SHYFT_API_URL.LISTING_NFT,
      { network, nft_address, sender, receiver }
    )
    return data
  } catch (err) {
    console.log(err.response)
  }
}

import { get, post } from "./apiService";

export const listingOrder = async(params) => await post('/nfts/listing-order', params);
export const marketOrders = async(params) => await get('/nfts/market-orders', params);
export const transferNFT = async(params) => await post('/nfts/market-buy-order', params);
export const cancelListingOrder = async(params) => await post('/nfts/market-cancel-order', params);

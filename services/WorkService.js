import { get, post } from './apiService'

export const getPermission = async(params = {}) => await get('get-permission-access', params)
export const getInformationCompany = async(params = {}) => await get('get-infor-company', params)
export const createWork = async(params) => await post('works/create', params)
export const getMyWorks = async(params) => await get('works/my-works', params)

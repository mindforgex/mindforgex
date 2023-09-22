import Head from "next/head";
import BreadCrumbs from "../../components/BreadCrumbs";
// import Pagination from '../../components/Pagination';
import NFTProfile from "../../components/NFTProfile";
import { useCallback, useEffect, useState } from "react";
import { getInventory } from '../../services/inventoryService'
import { getUserInfo } from "../../utils/helpers";

export default function MyInventory() {
  const [inventory, setInventory] = useState([])
  const [params] = useState({ pageIndex: 1, pageSize: 6 })

  const getData = useCallback(async () => {
    const userInfo = getUserInfo()
    if (userInfo?.user?.walletAddress) {
      const { items } = await getInventory(userInfo?.user?.walletAddress, params)
      setInventory(items)
    }
  }, [params])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <>
      <Head>
        <title>My Inventory</title>
      </Head>
      <div className="nk-gap-2" />
      <BreadCrumbs label="My Inventory" root={[{ href: '/', label: "Home" }]} />
      <div className="nk-gap-2 mt-10" />

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <NFTProfile data={inventory} className="columns-2" />
            {/* <Pagination pageCount={Math.ceil()} onPageChange={() => { }} /> */}
          </div>
        </div>
      </div>

    </>
  )
}
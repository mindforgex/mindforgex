import Head from "next/head";
import BreadCrumbs from "../../components/BreadCrumbs";
import Pagination from '../../components/Pagination';
import NFTProfile from "../../components/NFTProfile";
import { MOCK_INVENTORY } from "../../utils/data";

export default function MyInventory() {
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
            <NFTProfile data={MOCK_INVENTORY} className="columns-2" />
            <Pagination pageCount={100} onPageChange={() => { }} />
          </div>
        </div>
      </div>

    </>
  )
}
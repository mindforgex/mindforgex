import Head from "next/head";
import BreadCrumbs from "../../../components/BreadCrumbs";
// import Pagination from '../../../components/Pagination';
import RewardItem from "../../../components/RewardList";
import { useCallback, useEffect, useState } from "react";
import { getRewardHistory } from '../../../services/inventoryService'
import { getUserInfo } from "../../../utils/helpers";
import { Flex, Spinner } from "@chakra-ui/react";
import { useAppRedireact } from "../../../utils/hook";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function MyInventory() {
  const [generateRouter] = useAppRedireact();
  const { t } = useTranslation('common')

  const [rewardHistory, setRewardHistory] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getData = useCallback(async () => {
    const userInfo = getUserInfo()
    if (userInfo?.user) {
      const { items } = await getRewardHistory()
      const data = items.map((_item) => {
        _item.reward_data = _item.reward_data[0]
        _item.nft_collection_data = _item.nft_collection_data[0]
        return _item
      })

      setRewardHistory(data)
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <>
      <Head>
        <title>{t('menu.reward')}</title>
      </Head>
      <div className="nk-gap-2" />
      <BreadCrumbs
        label="Reward"
        root={
          [{ href: generateRouter(''), label: t("menu.channel") }, { href: generateRouter(''), label: t("menu.my_inventory") }]
        }
      />
      <div className="nk-gap-2 mt-10" />
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {
              isLoading ? (
                <Flex justifyContent="center"><Spinner /></Flex>
              ) : (
                <>
                  <RewardItem data={rewardHistory} className="columns-2" />
                  {/* <Pagination pageCount={Math.ceil()} onPageChange={() => { }} /> */}
                </>
              )
            }
          </div>
        </div>
      </div>

    </>
  )
}

export const getServerSideProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale, ['common'])) }
  }
}

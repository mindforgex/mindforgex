import Head from "next/head";
import BreadCrumbs from "../../../components/BreadCrumbs";
// import Pagination from '../../../components/Pagination';
import RewardItem from "../../../components/RewardList";
import { useCallback, useEffect, useState } from "react";
import { getRewardHistory } from '../../../services/inventoryService'
import { getUserInfo } from "../../../utils/helpers";
import { Flex, Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useAppRedireact } from "../../../utils/hook";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import SkeletonCard from "../../../components/marketplace/SkeletonCard";

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
  }, [getData]);

  const RenderSkeleton = () => {
    return (
      <Grid templateColumns='repeat(12, 1fr)' templateRows='repeat(2, 1fr)' gap={6} minH={'61rem'}>
        {Array(8).fill(0).map((_, index) => (
          <GridItem w='100%' h='auto' colSpan={{ base: 3, sm: 12, md: 6, xl: 3 }} rowSpan={1} key={`card-${index}`}>
            <SkeletonCard />
          </GridItem>
        ))}
      </Grid>
    )
  };

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
        {
          isLoading ? (
            <RenderSkeleton />
          ) : (
            <>
              <RewardItem data={rewardHistory} className="columns-2" />
              {/* <Pagination pageCount={Math.ceil()} onPageChange={() => { }} /> */}
            </>
          )
        }
      </div>

    </>
  )
}

export const getServerSideProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale, ['common'])) }
  }
}

import Head from 'next/head'
import React, { useCallback, useEffect, useState } from 'react'
import BreadCrumbs from "../../../components/BreadCrumbs";
import CollectionList from '../../../components/Inventory/CollectionList';
import { getUserInfo } from '../../../utils/helpers';
import { Box, Flex, SkeletonCircle, SkeletonText, Spinner } from '@chakra-ui/react';
import { getUserCollection } from '../../../services/inventoryService'
import axios from 'axios';
import { useTranslation } from 'next-i18next';
import { useAppRedireact } from '../../../utils/hook';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function Collection() {
  const { t } = useTranslation('common')
  const [generateRouter] = useAppRedireact();
 
  const [collectionData, setCollectionData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [params] = useState({ pageIndex: 1, pageSize: 6 })

  const getData = useCallback(async () => {
    const userInfo = getUserInfo()
    if (userInfo?.user?.walletAddress) {
      const { items } = await getUserCollection(userInfo?.user?.walletAddress, params)
      const data = await Promise.all(
        items?.map(async (_item) => {
          const resp = await axios.get(_item.metadata_uri)
          return {
            ..._item,
            reward_data: _item?.reward_data?.[0],
            ...resp.data || {}
          }
        })
      )
      setCollectionData(data)
      setIsLoading(false)
    }
  }, [params])

  useEffect(() => {
    getData()
  }, [getData]);

  const RenderSkeleton = () => {
    return (
      <Box
        p={6}
        boxShadow='lg'
        bg={'rgba(0, 0, 0, 0.6)'}
        borderRadius={'20px'}
        borderWidth={'1px'}
        borderColor={'gray.600'}
        borderStyle={'solid'}
      >
        <SkeletonText my='4' noOfLines={4} spacing='2' skeletonHeight='1' />
        <SkeletonCircle size='10' />
        <SkeletonText my='4' noOfLines={4} spacing='4' skeletonHeight='2' />
      </Box>
    )
  };

  return (
    <>
      <Head>
        <title>{t('menu.collection')}</title>
      </Head>

      <div className="nk-gap-2" />
      <BreadCrumbs
        label={t("menu.collection")}
        root={[
          { href: generateRouter('/'), label: t("menu.my_inventory") }
        ]}
      />
      <div className="nk-gap-2 mt-10" />


      <div className="container">
        <div className="col-lg-12">
          {
            isLoading ? (
              <RenderSkeleton />
            ) : (
              <>
                <CollectionList data={collectionData} onFetchCollection={getData} />
              </>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Collection

export const getServerSideProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale, ['common'])) }
  }
}

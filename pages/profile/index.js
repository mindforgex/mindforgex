import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import BreadCrumbs from '../../components/BreadCrumbs'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useAppRedireact } from '../../utils/hook'
import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import { getUserInfo, saveUserInfo, setU } from '../../utils/helpers'
import supabase, { signInWithDiscord } from '../../utils/supabase'
import { connectToDiscord } from '../../services/authService';

export const getServerSideProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale, ['common'])) }
  }
}

function Profile() {
  const { t } = useTranslation()
  const [generateRouter] = useAppRedireact()
  const userInfo = getUserInfo()
  const toast = useToast()
  const [refresh, setRefresh] = useState(0)

  const onSignInDiscord = () => {
    signInWithDiscord()
      .then(({ error }) => {
        if (error) {
          toast({
            title: t('profile.authorize_discord_failed'),
            description: t('msg.something_went_wrong'),
            status: 'error',
            isClosable: true,
          })
        }
      })
  }

  useEffect(() => {
    if (!userInfo || (userInfo.user.discordId && userInfo.user.discordUsername)) return;
  
    supabase.auth.getSession()
      .then((res) => {
        if (res.data.session) {
          return supabase.auth.getUser()
        }
      })
      .then((resp) => {
        if (!resp) return;
        const { data } = resp
        if (data?.user) {
          userInfo.user.discordId = data.user.user_metadata.provider_id;
          userInfo.user.discordUsername = data.user.user_metadata.name
          return connectToDiscord({ discordId: data.user.user_metadata.provider_id, discordUsername: data.user.user_metadata.name })
        } else {
          toast({
            title: t('profile.confirm_connect_with_discord_failed'),
            description: t('msg.something_went_wrong'),
            status: 'error',
            isClosable: true,
          })
        }
      })
      .then((resp) => {
        if (resp && resp.message) {
          saveUserInfo(userInfo)
          setRefresh(Math.random())
        }
      })
  }, [userInfo])

  return (
    <>
      <Head>
        <title>{t('menu.profile')}</title>
      </Head>
      <div className="nk-gap-2" />
      <BreadCrumbs label={t('menu.profile')} />
      <div className="nk-gap-2 mt-10" />

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Flex gap={8} flexWrap='wrap'>
              <Text flexBasis={150} fontSize='larger' as='label'>{t('profile.wallet_address')}:</Text>
              <Text flexBasis={150} fontSize='larger'>{userInfo?.user?.walletAddress}</Text>
            </Flex>
            <Flex gap={8} flexWrap='wrap' alignItems='center'>
              <Text flexBasis={150} fontSize='larger' as='label'>Discord:</Text>
              {
                userInfo?.user?.discordUsername ? (
                  <Flex alignItems='center'>
                    <Text mr={8} as='div' fontSize='larger'>{userInfo?.user?.discordUsername?.replace('#0', '') || ""}</Text>
                    <Button
                      className='nk-btn nk-btn-color-main-1'
                      bg='#dd163b !important'
                      color='#fff'
                      onClick={() => { }}
                    >{t('profile.disconnect')}</Button>
                  </Flex>
                ) : (
                  <Button
                    className='nk-btn nk-btn-color-main-1'
                    bg='#dd163b !important'
                    color='#fff'
                    onClick={onSignInDiscord}
                  >{t('profile.connect_with_discord')}</Button>
                )
              }
            </Flex>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
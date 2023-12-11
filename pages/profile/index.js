import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import BreadCrumbs from '../../components/BreadCrumbs'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import { getUserInfo, saveUserInfo } from '../../utils/helpers'
import supabase, { signInWithDiscord } from '../../utils/supabase'
import { connectToDiscord, connectToTwitch, getTwitchUserProfile } from '../../services/authService';
import queryString from 'query-string';
import { useCallback } from 'react';

export const getServerSideProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale, ['common'])) }
  }
}

function Profile() {
  const { t } = useTranslation()
  const userInfo = getUserInfo()
  const toast = useToast()
  const [_, setRefresh] = useState(0)

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

  const onSignInTwitch = () => {
    const encodePathParameter = queryString.stringify({
      response_type: 'token',
      client_id: process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID,
      redirect_uri: process.env.NEXT_PUBLIC_URL + '/profile',
      state: true,
      scope: 'user:read:follows'
    })
    window.open('https://id.twitch.tv/oauth2/authorize' + '?' + encodePathParameter)
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
            title: t('profile.confirm_connect_to_discord_failed'),
            description: t('msg.something_went_wrong'),
            status: 'error',
            isClosable: true,
          })
        }
      })
      .then((resp) => {
        if (resp) {
          saveUserInfo(userInfo)
          setRefresh(Math.random())
        }
      })
  }, [userInfo, toast, t])
  
  const checkTwitchCallback = useCallback(async () => {
    try {
      if (!location.hash.length) return;
      const decodeData = queryString.parse(location.hash.slice(1))
      if (!decodeData.access_token) return;
  
      const twitchProfile = await getTwitchUserProfile(decodeData.access_token)
      if (!twitchProfile) {
        toast({
          title: t('profile.connect_to_twitch_failed'),
          description: t('msg.something_went_wrong'),
          status: 'error',
          isClosable: true,
        })
        location.hash = ''
        return;
      }

      const updateUserData = {
        twitchId: twitchProfile.id,
        twitchLogin: twitchProfile.login,
        twitchAccessToken: decodeData.access_token,
      }
      const resp = await connectToTwitch(updateUserData);
      if (resp) {
        saveUserInfo({ ...userInfo, user: { ...userInfo.user, ...updateUserData } })
        setRefresh(Math.random())
      }
    } catch (error) {
      console.log(error);
    }

    location.hash = ''
  }, [userInfo, toast, t])

  useEffect(() => {
    checkTwitchCallback()
  }, [checkTwitchCallback])

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
            <Flex gap={8} flexWrap='wrap' mb={3}>
              <Text flexBasis={150} fontSize='larger' as='label'>{t('profile.wallet_address')}:</Text>
              <Text flexBasis={150} fontSize='larger' as='div'>{userInfo?.user?.walletAddress}</Text>
            </Flex>
            <Flex gap={8} flexWrap='wrap' alignItems='center' mb={3}>
              <Text flexBasis={150} fontSize='larger' as='label'>Discord:</Text>
              {
                userInfo?.user?.discordUsername ? (
                  <Flex alignItems='center'>
                    <Text fontSize='larger' as='div'>{userInfo?.user?.discordUsername?.replace('#0', '') || ""}</Text>
                    {/* <Button
                      className='nk-btn nk-btn-color-main-1'
                      bg='#dd163b !important'
                      color='#fff'
                      onClick={() => { }}
                    >{t('profile.disconnect')}</Button> */}
                  </Flex>
                ) : (
                  <Button
                    className='nk-btn nk-btn-color-main-1'
                    bg='#dd163b !important'
                    color='#fff'
                    onClick={onSignInDiscord}
                  >{t('profile.connect_to_discord')}</Button>
                )
              }
            </Flex>

            <Flex gap={8} flexWrap='wrap' alignItems='center' mb={3}>
              <Text flexBasis={150} fontSize='larger' as='label'>Twitch:</Text>
              {
                userInfo?.user?.twitchLogin ? (
                  <Flex alignItems='center'>
                    <Text fontSize='larger' as='div'>{userInfo?.user?.twitchLogin?.replace('#0', '') || ""}</Text>
                    {/* <Button
                      className='nk-btn nk-btn-color-main-1'
                      bg='#dd163b !important'
                      color='#fff'
                      onClick={() => { }}
                    >{t('profile.disconnect')}</Button> */}
                  </Flex>
                ) : (
                  <Button
                    className='nk-btn nk-btn-color-main-1'
                    bg='#dd163b !important'
                    color='#fff'
                    onClick={onSignInTwitch}
                  >{t('profile.connect_to_twitch')}</Button>
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

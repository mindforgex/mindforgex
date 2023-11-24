import { Box, Flex, Image, Link, Progress, ProgressLabel, Text } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React from 'react';
import BreadCrumbs from '../components/BreadCrumbs';
import ChakraCarousel from '../components/ChakraCarousel';

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>AboutUs</title>
      </Head>
      <Flex className={'container'} direction={'column'}>
        <Flex className="nk-gap-2" />
        <BreadCrumbs label={'About Us'} root={{ label: '', href: '' }} />
        <Text
          as={'h2'}
          textTransform={'initial'}
          fontSize={{ xl: '2xl', sm: 'xl' }}
          mt={8}
          px={4}>
          MindForgeX is a quest system for live streamers, designed to build and engage with their fanbase by leveraging cNFT technology.
        </Text>
        <Flex direction={'column'} mt={{ xl: 12, sm: 2 }}>
          <Text
            as={'h3'}
            fontWeight={'semibold'}
            overflow={'hidden'}
            fontSize={{ xl: '1.75rem', sm: 'md' }}
            textAlign={'right'}
            mt={4}
            _before={{
              bg: '#dd163b',
              content:`""`,
              display: 'inline-block',
              h: '2px',
              pos: 'relative',
              verticalAlign: 'bottom',
              w: '100%',
              right: '0.8em',
              ml: '-50%'
            }}
          >
            Mission
          </Text>
          <Text
            as={'p'}
            fontSize={{ xl: 'md', sm: 'sm' }}
            color={'white'}
            fontWeight={'normal'}
            lineHeight={2}
            letterSpacing={1}
            wordBreak={'break-word'}
            overflow={'hidden'}
          >
            At MindForgeX, our mission is to revolutionize live streaming loyalty. We are committed to providing streamers with powerful tools to build and engage with their fanbase in unprecedented ways.
          </Text>
          <Text
            as={'h3'}
            fontWeight={'semibold'}
            overflow={'hidden'}
            fontSize={{ xl: '1.75rem', sm: 'md' }}
            textAlign={'left'}
            mt={4}
            _after={{
              bg: '#dd163b',
              content:`""`,
              display: 'inline-block',
              h: '2px',
              pos: 'relative',
              verticalAlign: 'bottom',
              w: { xl: '100%', sm: '50%' },
              left: '0.8em',
              mr: '-50%'
            }}
          >
            Awards and Achievements
          </Text>
          <Text
            as={'p'}
            fontSize={{ xl: 'md', sm: 'sm' }}
            color={'white'}
            fontWeight={'normal'}
            lineHeight={2}
            letterSpacing={1}
            wordBreak={'break-word'}
            overflow={'hidden'}
          >
            We take pride in our accomplishments, including winning the Second Prize at the Solana Consumer Hack 08, receiving the Ecosystem Prize at the Vietnam VC Award Night, clinching the 3rd Prize in the Solana Hyperdrive Global Hackathon for the APAC region (Dora Hack), and earning Honorable Mentions in the Solana Hyperdrive Global Hackathon (Game and Entertainment Track).
          </Text>
          <Text
            as={'h3'}
            mt={4}
            fontWeight={'semibold'}
            overflow={'hidden'}
            fontSize={{ xl: '1.75rem', sm: 'md' }}
            textAlign={'right'}
            _before={{
              bg: '#dd163b',
              content:`""`,
              display: 'inline-block',
              h: '2px',
              pos: 'relative',
              verticalAlign: 'bottom',
              w: { xl: '100%', sm: '75%' },
              right: '0.8em',
              ml: '-50%'
            }}
          >
            Unique Selling Proposition (USP)
          </Text>
          <Text
            as={'p'}
            fontSize={{ xl: 'md', sm: 'sm' }}
            color={'white'}
            fontWeight={'normal'}
            lineHeight={2}
            letterSpacing={1}
            wordBreak={'break-word'}
            overflow={'hidden'}
          >
            + Quest System for Streamers: MindForgeX introduces an exclusive quest system tailored for live streamers. This feature empowers streamers to dynamically connect with their fanbase, fostering a more engaging and interactive streaming experience.
          </Text>
          <Text
            as={'p'}
            fontSize={{ xl: 'md', sm: 'sm' }}
            color={'white'}
            fontWeight={'normal'}
            lineHeight={2}
            letterSpacing={1}
            wordBreak={'break-word'}
            overflow={'hidden'}
          >
            + cNFT Technology Integration: Setting MindForgeX apart is the integration of state-of-the-art cNFT technology. Streamers can craft personalized collections and distribute NFTs to their fans at an exceptionally low cost, creating a unique and cost-effective channel for building deeper connections.
          </Text>
          <Text
            as={'p'}
            fontSize={{ xl: 'md', sm: 'sm' }}
            color={'white'}
            fontWeight={'normal'}
            lineHeight={2}
            letterSpacing={1}
            wordBreak={'break-word'}
            overflow={'hidden'}
          >
            + Interactive Fan Engagement: Our platform promotes active fan engagement by incentivizing them to complete tasks, earning NFTs in return. These collected NFTs unlock exclusive fan services, including access to streaming sessions with idols and participation in idol events.
          </Text>
          <Text
            as={'h3'}
            fontWeight={'semibold'}
            overflow={'hidden'}
            fontSize={{ xl: '1.75rem', sm: 'md' }}
            textAlign={'left'}
            mt={4}
            _after={{
              bg: '#dd163b',
              content:`""`,
              display: 'inline-block',
              h: '2px',
              pos: 'relative',
              verticalAlign: 'bottom',
              w: '100%',
              left: '0.8em',
              mr: '-50%'
            }}
          >
            Tech Stack
          </Text>
          <Text
            as={'p'}
            fontSize={{ xl: 'md', sm: 'sm' }}
            color={'white'}
            fontWeight={'normal'}
            lineHeight={2}
            letterSpacing={1}
            wordBreak={'break-word'}
            overflow={'hidden'}
          >
            Our technology is built on a robust foundation, utilizing the following stack:
          </Text>
          <Text
            as={'p'}
            fontSize={{ xl: 'xl', sm: 'md' }}
            color={'white'}
            fontWeight={'normal'}
            lineHeight={2}
            letterSpacing={1}
            wordBreak={'break-word'}
            overflow={'hidden'}
          >
            <Flex alignItems={'center'}>
              <Progress h={'2.2rem'} value={80}  bg={'gray.400'} colorScheme={'blue'} w={{ xl: '50%', sm: '100%' }}>
                <ProgressLabel fontSize={{ xl: 'md', sm: 'sm' }} mr={'auto'} textAlign={'left'}>
                  <Text as={'span'} mx={8}>Javascript / Nodejs (React + Nestjs)</Text>
                  <Text as={'span'}>80%</Text>
                </ProgressLabel>
              </Progress>
            </Flex>
            <Flex alignItems={'center'} my={4}>
              <Progress colorScheme={'green'} bg={'gray.400'} h={'2.2rem'} value={10} w={{ xl: '50%', sm: '100%' }}>
                <ProgressLabel fontSize={{ xl: 'md', sm: 'sm' }} mr={'auto'} textAlign={'left'}>
                  <Text as={'span'} mx={8}>Shyft API</Text>
                  <Text as={'span'}>10%</Text>
                </ProgressLabel>
              </Progress>
            </Flex>
            <Flex alignItems={'center'}>
              <Progress colorScheme={'orange'} bg={'gray.400'} h={'2.2rem'} value={10} w={{ xl: '50%', sm: '100%' }}>
                <ProgressLabel fontSize={{ xl: 'md', sm: 'sm' }} mr={'auto'} textAlign={'left'}>
                  <Text as={'span'} mx={8}>Solana wallet adapter</Text>
                  <Text as={'span'}>10%</Text>
                </ProgressLabel>
              </Progress>
            </Flex>
          </Text>
          <Text
            as={'p'}
            fontSize={{ xl: 'md', sm: 'sm' }}
            color={'white'}
            fontWeight={'normal'}
            lineHeight={2}
            letterSpacing={1}
            wordBreak={'break-word'}
            overflow={'hidden'}
          >
            Join MindForgeX as we redefine the future of live streaming, offering streamers and their fans an unparalleled experience in building lasting connections.
          </Text>
          <Text
            as={'h3'}
            mt={4}
            fontWeight={'semibold'}
            overflow={'hidden'}
            fontSize={{ xl: '1.75rem', sm: 'md' }}
            textAlign={'right'}
            _before={{
              bg: '#dd163b',
              content:`""`,
              display: 'inline-block',
              h: '2px',
              pos: 'relative',
              verticalAlign: 'bottom',
              w: '100%',
              right: '0.8em',
              ml: '-50%'
            }}
          >
           Partnership
          </Text>
          <ChakraCarousel gap={32} mt={8}>
            <Box>
              <Link
                href='https://orada.co.jp'
                target="_blank"
              >
                <Image w={36} src='/assets/Orada.png' alt='Orada' />
              </Link>
            </Box>
            <Box>
              <Link
                href='https://relipa.global/'
                target="_blank"
              >
                <Image w={24} src='https://relipa.global/user-page/img/logo-white.png' alt='Relipa' />
              </Link>
            </Box>
          </ChakraCarousel>
        </Flex>
      </Flex>
    </>
  )
}

export default AboutUs;

export const getServerSideProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale, ['common'])) }
  }
}

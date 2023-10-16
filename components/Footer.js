import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import { BsDiscord, BsTwitter, BsYoutube } from "react-icons/bs";
import { SEO_CONTENT } from '../utils/seo'

export default function Footer() {
  return (
    <footer className="nk-footer">
      <div className="nk-copyright">
        <Flex 
          className="container" 
          py={12} 
          gap={12}
          justifyContent={{ base: 'center', md: 'space-between' }}
          alignItems='start'
          flexWrap='wrap'
        >
          <Flex>
            <Image 
              src="/favicon.ico"
              w={24}
              height={24}
              alt="MindForgeX"
              mr={1}
            />
            <Text className="mb-0">
              Copyright © {new Date().getFullYear()} {" "}  <br />
              The Re-Techie Pirates - {SEO_CONTENT.siteName} <br />
              {SEO_CONTENT.title}
            </Text>
          </Flex>

          <Flex direction="column" justifyContent='center'>
            <Text as='h5'>Join our community</Text>
            <ul className="nk-social-links-2 flex justify-content-center">
              <li>
                <Link
                  className="nk-social-youtube"
                  href='https://www.youtube.com/channel/UCKrLBqxAKASRlmu_2yUtplw'
                  target="_blank"
                >
                  <BsYoutube className="bsp-icon" />
                </Link>
              </li>
              <li>
                <Link
                  className="nk-social-twitter"
                  href='https://twitter.com/MindForgeX'
                  target="_blank"
                >
                  <BsTwitter className="bsp-icon" />
                </Link>
              </li>
              <li>
                <Link
                  className="nk-social-facebook"
                  href='https://discord.gg/pAwxpnZW'
                  target="_blank"
                >
                  <BsDiscord className="bsp-icon" />
                </Link>
              </li>
            </ul>
          </Flex>

          <Flex direction="column" justifyContent='center'>
            <Text as='h5'>Partnership</Text>
            <Flex flexDirection='column' gap={6}>
              <Box>
                <Link
                  href='https://orada.co.jp'
                  target="_blank"
                >
                  <Image w={36} src='/assets/Orada.png' alt='Orada' />
                </Link>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </div>
    </footer>

  )
}
import { Box, Flex, Image, Link, List, ListIcon, ListItem, Text } from "@chakra-ui/react";
import { BsDiscord, BsTwitter, BsYoutube } from "react-icons/bs";
import { SEO_CONTENT } from '../utils/seo'
import { MdGroup, MdInventory, MdLiveTv, MdStore } from "react-icons/md";
import { RiProfileLine } from "react-icons/ri";
import { useAppRedireact } from "../utils/hook";
import { useRouter } from "next/router";

export default function Footer() {
  const [generateRouter] = useAppRedireact();
  const navigate = useRouter();

  return (
    <footer className="nk-footer">
      <div className="nk-copyright">
        <Flex 
          className="container" 
          py={12} 
          gap={12}
          justifyContent={{xl: 'center', md: 'space-between', sm: 'center' }}
          alignItems={{xl: 'start', md: 'center', sm: 'center' }}
          flexWrap='wrap'
          direction={{xl: 'row', sm: 'column' }}
        >
          <Flex>
            <Image 
              src="/favicon.ico"
              w={24}
              height={24}
              alt="MindForgeX"
              mr={1}
            />
            <Text className="mb-0" display={'flex'} alignItems={'center'}>
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

          <Flex direction="column" justifyContent='center' display={{ xl: 'flex', sm: 'none' }}>
            <Text as='h5'>Main partnership</Text>
            <Flex flexDirection='column' gap={6}>
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
            </Flex>
          </Flex>
          <Flex
            direction="column"
            justifyContent='center'
            maxW={{xl: '25%', sm: '100%' }}
            alignItems={{ xl: 'start', sm: 'center' }}
          >
            <Text as='h5'>Menu</Text>
            <List
              spacing={3}
              display={'flex'}
              flexWrap={'wrap'}
              alignItems={'center'}
              pl={0}
              my={0}
            >
              <ListItem
                m={'0 5px 5px 0px !important'}
                p={0}
                w={{xl: '45%', sm: '100%' }}
                textAlign={{ sm: 'center', xl: 'initial' }}
                fontSize={'1.1rem'}
                cursor={'pointer'}
                _hover={{ color: 'red.500' }}
                onClick={() => {
                  navigate.push(generateRouter('about'));
                }}
              >
                <ListIcon as={MdGroup} color='red.500' />
                About us
              </ListItem>
              <ListItem
                m={'0 5px 5px 0px !important'}
                p={0}
                w={{xl: '45%', sm: '100%' }}
                textAlign={{ sm: 'center', xl: 'initial' }}
                fontSize={'1.1rem'}
                cursor={'pointer'}
                _hover={{ color: 'red.500' }}
                onClick={() => {
                  navigate.push(generateRouter(''));
                }}
              >
                <ListIcon as={MdLiveTv} color='red.500' />
                Channel
              </ListItem>
              <ListItem
                m={'0 5px 5px 0px !important'}
                p={0}
                w={{xl: '45%', sm: '100%' }}
                textAlign={{ sm: 'center', xl: 'initial' }}
                fontSize={'1.1rem'}
                cursor={'pointer'}
                _hover={{ color: 'red.500' }}
                onClick={() => {
                  navigate.push(generateRouter('my-inventory/collection'));
                }}
              >
                <ListIcon as={MdInventory} color='red.500' />
                My Inventory
              </ListItem>
              <ListItem
                m={'0 5px 5px 0px !important'}
                p={0}
                w={{xl: '45%', sm: '100%' }}
                textAlign={{ sm: 'center', xl: 'initial' }}
                fontSize={'1.1rem'}
                cursor={'pointer'}
                _hover={{ color: 'red.500' }}
                onClick={() => {
                  navigate.push(generateRouter('profile'));
                }}
              >
                <ListIcon as={RiProfileLine} color='red.500' />
                Profile
              </ListItem>
              <ListItem
                m={'0 5px 5px 0px !important'}
                p={0}
                w={{xl: '45%', sm: '100%' }}
                textAlign={{ sm: 'center', xl: 'initial' }}
                fontSize={'1.1rem'}
                cursor={'pointer'}
                _hover={{ color: 'red.500' }}
                onClick={() => {
                  navigate.push(generateRouter('marketplace'));
                }}
              >
                <ListIcon as={MdStore} color='red.500' />
                Marketplace
              </ListItem>
            </List>
          </Flex>
        </Flex>
      </div>
    </footer>
  )
}

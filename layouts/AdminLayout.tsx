import React, { Children, ReactNode, ReactText, useEffect, useState } from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Image,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { MdGroup, MdMenu, MdClear } from "react-icons/md";

interface LinkItemProps {
  name: string
  icon: IconType
  href?: string
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, href: '/manager' },
  { name: 'About us', icon: MdGroup, href: '/manager/about-us'},
  { name: 'Settings', icon: FiSettings },
]

export default function AdminLayout({ isAdmin, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isOpenPc, setOpen] = useState<boolean>(true);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => setOpen(false)} display={{ base: 'none', md: 'block' }}
        isOpenPc={isOpenPc}
        onOpenPc={() => setOpen(true)}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} isOpenPc={true} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box
        ml={{ base: 0, md: isOpenPc ? 60 : 20 }}
        h={'100vh'}
        p="4"
        bg={useColorModeValue('rgba(0, 0, 0, .6)', 'gray.900')}
        maxH={'100vh'}
        overflowY={'auto'}
      >
        { children }
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void,
  isOpenPc: boolean,
  onOpenPc?: () => void,
}

const SidebarContent = ({ isOpenPc, onOpenPc, onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      w={{ base: 'full', md: isOpenPc ? 60 : 20 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex
        pos={'absolute'}
        right={1} top={0}
        display={{ sm: 'none', lg: 'initial' }}
        cursor={'pointer'}
        zIndex={'999'}
        onClick={isOpenPc ? onClose : onOpenPc}
      >
        <Icon
          as={isOpenPc ? MdMenu : MdClear}
          boxSize={8}
          color={'white'}
        />
      </Flex>
      <Flex h="20" alignItems="center" justifyContent="flex-start" bg={'rgba(0, 0, 0, 0.6)'}>
        {
          isOpenPc
          ? <Image src="/assets/logo.svg" alt="" boxSize={{ lg: 40, sm: 40, base: 36 }} ml={{ sm: 4 }} />
          : <Image src="/favicon.png" alt="" boxSize={{ lg: 20, sm: 40, base: 36 }} />
        }
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} ml={'auto'} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} isOpen={isOpenPc} href={link.href}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactText,
  isOpen: boolean,
  href?: string,
}
const NavItem = ({ icon, children, isOpen, href = '#', ...rest }: NavItemProps) => {
  return (
    <Box
      as="a"
      href={href}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        p="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        alignItems={'center'}
        justifyContent={isOpen ? 'flex-start' : "center"}
        w={'100%'}
        {...rest}>
        {icon && (
          <Icon
            mr={isOpen ? 4 : 0}
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {isOpen ? children : ''}
      </Flex>
    </Box>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('rgba(0, 0, 0, 0.6)', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Flex ml={'auto'}>
        <Image src="/assets/logo.svg" alt="" boxSize={{ sm: 40 }}/>
      </Flex>
    </Flex>
  )
}

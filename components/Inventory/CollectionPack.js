import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Icon,
  Image,
  Popover,
  PopoverArrow, PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text 
} from '@chakra-ui/react'
import React from 'react'
import { AiFillLock } from 'react-icons/ai'
import { HiDotsHorizontal } from 'react-icons/hi';
import ListingItem from '../marketplace/ListingItem';

function CollectionPack({ data }) {
  if (!data) return <></>;

  return (
    <Flex direction={'column'} alignItems={'center'} pos={'relative'}>
      <Popover>
        <PopoverTrigger>
        <Flex pos={'absolute'} top={1} right={3} cursor={'pointer'} zIndex={9}>
          <Icon as={HiDotsHorizontal} w={6} h={6} />
        </Flex>
        </PopoverTrigger>
        <PopoverContent w={'100%'}>
          <PopoverArrow />
          <PopoverBody>
            <ListingItem data={data} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger>
          <Box
            cursor='pointer'
            position='relative' 
            className='nft-info-item'
            direction="column"
            alignItems="center"
            py={5}
            px={5}
            width="230px"
            bgColor={'var(--cbp-color-background)'}
            boxShadow="0px 3px 16px rgb(47 83 109 / 12%)"
            transition="all 0.3s ease-in-out"
            mb="40px"
            overflow="hidden"
            borderRadius="20"
            _hover={{
              '&>*': { opacity: 1 },
              transform: 'translateY(-10px)',
              transition: 'all 0.4s ease',
            }}
            role="group"
            minW={'165px'}
            css={{ webkitFilter: 'grayscale(0%)' }}
            pos={'relative'}
          >
            { data.amount ? (
              <Flex pos={'absolute'} top={2} left={4}>
                <Badge
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  fontWeight={'extrabold'}
                  borderRadius={'full'}
                  fontSize={'11px'}
                  w={'16px'}
                  h={'16px'}
                >{data?.amount}</Badge>
              </Flex>
              ) : ''
            }
            {
              !data.amount ? (
                <Flex
                  pos={'absolute'}
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bg={'rgba(0, 0, 0, .6)'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  w={'100%'}
                  zIndex={9}
                >
                  <Icon as={AiFillLock} boxSize={'3rem'} color={'gray.400'} mt={'-2rem'} />
                </Flex>
              ) : ''
            }
            <Card
              height='100%'
              bg={'transparent'}
            >
              <CardBody p={0} mb={4} w={'100%'} justifyContent='center' display='flex'>
                <Image
                  fill={true}
                  src={data.image}
                  alt={data.name}
                  w={'100%'}
                  aspectRatio='1 / 1'
                  borderRadius={'full'}
                  onError={(event) => {
                    event.target.src="/assets/thumbnail.png"
                  }}
                />
              </CardBody>
              <CardFooter 
                w='100%' 
                display='flex' 
                justifyContent={'center'}
                padding='3'
              >
                <Text 
                  height='20px'
                  textOverflow='ellipsis'
                  overflow='hidden'
                  whiteSpace='nowrap'
                  mb='0' 
                  color={'white'}
                >{data.name} ({data.symbol})</Text>
              </CardFooter>
            </Card>
          </Box>
        </PopoverTrigger>
        <PopoverContent color={'black'}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>{data.name} ({data.symbol})</PopoverHeader>
          <PopoverBody>
            <Text as={'p'}>{data.description}</Text>
            <Divider w={'100%'} maxW={'unset !important'} />
            <Text as={'p'}>Nft balance: {data.order?.length || 0}</Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  )
}

export default CollectionPack

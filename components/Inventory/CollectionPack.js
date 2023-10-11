import { Box, Card, CardBody, CardFooter, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text } from '@chakra-ui/react'
import React from 'react'
import { AiFillLock } from 'react-icons/ai'

function CollectionPack({ data }) {
  if (!data) return <></>;

  return (
    <Popover>
      <PopoverTrigger>
        <Box
          cursor='pointer'
          position='relative' 
          className='nft-info-item'
          maxHeight={200}
        >
          {
            !data.owned && (
              <div className='locked'>
                <AiFillLock />
              </div>
            )
          }
          <Card
            height='100%'
            backgroundColor='rgba(0, 0, 0, 0.6)'
            color='#fff'
            border='1px solid #aaaaaa50'
            filter={`contrast(${!data.owned ? '20%' : '100%'})`}
            maxHeight={200}
          >
        
            <CardBody 
              display='flex' 
              justifyContent='center'
            >
              <Image
                fill={true}
                src={data.image}
                alt={data.name}
                w={100}
                onError={(event) => {
                  event.target.src="/assets/thumbnail.png"
                }}
              />
            </CardBody>
            <CardFooter w='100%' display='flex' justifyContent={'center'} padding='3'>
              <Text mb='0'>{data.name} ({data.symbol})</Text>
            </CardFooter>
          </Card>
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>{data.name} ({data.symbol})</PopoverHeader>
        <PopoverBody>{data.description}</PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default CollectionPack
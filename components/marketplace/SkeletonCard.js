import { Card, CardBody, Flex, Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react"
import React from 'react';

const SkeletonCard = () => {
  return (
    <Card
      borderRadius={'20px'}
      boxShadow="0px 3px 16px rgb(47 83 109 / 12%)"
      transition="all 0.3s ease-in-out"
      bgColor={'var(--cbp-color-background)'}
    >
      <Skeleton height="360px" borderRadius={'20px 20px 0 0'} />
      <CardBody>
        <Flex w={'100%'}>
          <SkeletonCircle size='10' />
          <SkeletonText w={'calc(100% - var(--chakra-sizes-12))'} ml={2} />
        </Flex>
      </CardBody>
  </Card>
  )
}
export default React.memo(SkeletonCard);

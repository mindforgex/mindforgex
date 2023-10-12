import { Button, Flex, Image, Text } from "@chakra-ui/react";

export default function ClaimNFTButton({ btnProps, children, nftData }) {
  return (
    <div
      className="nk-widget nk-widget-highlighted ghostkit-reusable-widget position-relative claim-nft"
    >
      <Flex justifyContent="space-between">
        <div>
          <Image
            height={200}
            width={100}
            src={nftData?.image}
            alt=""
            onError={(event) =>{ 
              event.target.src = '/assets/thumbnail.png'
            }}
          />
          <Text className="h5 nft-name">
            {nftData?.name}
          </Text>
        </div>
        <Button
          size='lg'
          {...btnProps}
        >{children}</Button>
      </Flex>
    </div>
  )
}
import React from "react";
import { Button, Flex, FormControl, FormLabel, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import { Controller, useForm } from 'react-hook-form';

const AboutUs = () => {
  const { handleSubmit, control } = useForm<any>()
  return (
    <Flex direction={'column'}>
      <Text as={'h2'}>About Us</Text>
      <Grid
        templateColumns={'repeat(12, 1fr)'}
        templateRows={'repeat(2, 1fr)'}
        rowGap={10}
        columnGap={16}
      >
        <GridItem colSpan={5} rowSpan={1}>
          <Controller
            control={control}
            name="about"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <FormControl>
                <FormLabel>About</FormLabel>
                <Input type='text' onChange={onChange} />
              </FormControl>      
            )}
          />
        </GridItem>
        <GridItem colSpan={5} rowSpan={1}>
          <Controller
            control={control}
            name="mission"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <FormControl>
                <FormLabel>Mission</FormLabel>
                <Input type='text' onChange={onChange} />
              </FormControl>      
            )}
          />
        </GridItem>
        <GridItem colSpan={5} rowSpan={1}>
          <Controller
            control={control}
            name="mission"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <FormControl>
                <FormLabel>Mission</FormLabel>
                <Input type='text' onChange={onChange} />
              </FormControl>      
            )}
          />
        </GridItem>
        <GridItem colSpan={5} rowSpan={1}>
          <Controller
            control={control}
            name="awards"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <FormControl>
                <FormLabel>Awards and achievements</FormLabel>
                <Input type='text' onChange={onChange} />
              </FormControl>      
            )}
          />
        </GridItem>
        <GridItem colSpan={5} rowSpan={1}>
          <Controller
            control={control}
            name="unique"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <FormControl>
                <FormLabel>Unique selling proposition</FormLabel>
                <Input type='text' onChange={onChange} />
              </FormControl>      
            )}
          />
        </GridItem>
        <GridItem colSpan={5} rowSpan={1}>
          <Controller
            control={control}
            name="tech"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <FormControl>
                <FormLabel>Tech stack</FormLabel>
                <Input type='text' onChange={onChange} />
              </FormControl>      
            )}
          />
        </GridItem>
        <GridItem colSpan={5} rowSpan={1}>
          <Controller
            control={control}
            name="partner"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <FormControl>
                <FormLabel>Partner</FormLabel>
                <Input type='text' onChange={onChange} />
              </FormControl>      
            )}
          />
        </GridItem>
      </Grid>
      <Flex alignItems={'center'} justifyContent={'flex-start'} mt={12}>
        <Button
          colorScheme="red"
          variant={'outline'}
          w={'20%'}
          _hover={{ bg: 'red' }}
          py={6} 
          borderRadius={20}
        >
          <Text as="span" color={'white'} fontSize={'xl'} fontWeight={'semibold'}>
            Submit
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
};

export default AboutUs;

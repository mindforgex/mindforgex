import { Button, Flex, Image, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const SwitchLanguage = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const locales = useMemo(() => {
    return router.locales.map(l => {
      return { language: l, icon: `/assets/${l}.svg`};
    });
  }, [router]);
  const currentLanguage = useMemo(() => {
    return i18n.language;
  }, [i18n.language]);

  const Languages = ({ locales, i18n }) => {
    const handleChangeLanguage = (lang) => {
      i18n.changeLanguage(lang);
      const path = router.asPath;
      router.push(path, path, { locale: lang });
    };

    return (
      <>
        {locales.filter(lang => lang.language !== currentLanguage).map((l, index) => (
          <Flex
            justifyContent={'center'}
            textTransform={'uppercase'}
            color={'black'}
            alignItems={'center'}
            onClick={() => handleChangeLanguage(l.language)}
          >
            <Image
              src={l.icon}
              w={'34px'}
              borderColor={'gray.300'}
              borderWidth={'1px'}
              borderStyle={'solid'}
              borderRadius={'full'}
            />
          </Flex>
        ))}
      </>
    )
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button bg={'whiteAlpha.900'} ml={4} py={6} px={8} _hover={{ bg: 'whiteAlpha.900' }}>
          <Image
            src={`/assets/${currentLanguage}.svg`}
            w={'34px'}
            borderColor={'gray.300'}
            borderWidth={'1px'}
            borderStyle={'solid'}
            borderRadius={'full'}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent maxW={'80px'}>
        <PopoverArrow />
        <PopoverBody>
          <Languages locales={locales} i18n={i18n} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default React.memo(SwitchLanguage);

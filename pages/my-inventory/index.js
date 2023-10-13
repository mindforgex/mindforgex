import { useRouter } from "next/router";
import { useAppRedireact } from "../../utils/hook";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const MyInventory = () => {
  const router = useRouter();
  const [generateRouter] = useAppRedireact();
  router.push(generateRouter('/my-inventory/collection'));
  return (<></>)
}

export default MyInventory;

export const getServerSideProps = async ({ locale }) => {
  return {
    props: { ...(await serverSideTranslations(locale, ['common'])) }
  }
}

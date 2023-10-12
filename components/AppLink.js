import { Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const AppLink = ({ href, children, close, ...rest }) => {
  const navigate = useRouter();

  const redirect = (event) => {
    event.preventDefault();
    navigate(href);
    close && close();
  };

  return (
    <Link {...rest} onClick={redirect}>
      {children}
    </Link>
  );
};

export default AppLink;

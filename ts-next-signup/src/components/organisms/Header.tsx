import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import styled from '@emotion/styled';

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const router = useRouter();

  const [asPath, setAsPath] = useState('/');

  useEffect(() => {
    setAsPath(prev => (prev !== router.asPath ? router.asPath : prev));
  }, [router]);

  return (
    <SHeader>
      <SContainer>
        <SLogo>Logo</SLogo>
        <SNav></SNav>
        <SActionContainer>
          <NextLink
            href={{
              pathname: '/auth/sign_in',
              query: {
                redirect_url: asPath,
              },
            }}
          >
            로그인
          </NextLink>
        </SActionContainer>
      </SContainer>
    </SHeader>
  );
};

export default Header;

const SHeader = styled.header(() => {
  return {
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    height: 70,
    '@media screen and (max-width:768px)': {
      height: 56,
    },
  };
});

const SContainer = styled.div(() => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  };
});
const SLogo = styled.h1(() => {
  return {};
});
const SNav = styled.nav(() => {
  return {};
});
const SActionContainer = styled.div(() => {
  return {};
});

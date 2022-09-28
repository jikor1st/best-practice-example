import { ReactNode } from 'react';
import styled from '@emotion/styled';

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return <SMain>{children}</SMain>;
};

const SMain = styled.main();
export default Main;

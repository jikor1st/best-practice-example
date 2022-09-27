import NextLink from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { plusCounter, minusCounter } from '@/lib/store/module';

import styled from '@emotion/styled';

const SContainer = styled.div(() => {
  return {};
});

const SCounter = styled.p(() => {
  return {};
});

const SCounterButton = styled.button(() => {
  return {};
});

export default function ReduxCounterPage() {
  // get redux state
  const counterValue = useSelector((state: RootState) => state.counter.value);

  // dispatch redux state
  const dispatch = useDispatch();
  const handlePluseCounter = () => dispatch(plusCounter(10));
  const handleMinuseCounter = () => dispatch(minusCounter(10));

  return (
    <SContainer>
      <NextLink href={'/redux-counter'}>counter</NextLink>
      <br />
      <NextLink href={'/redux-user'}>user</NextLink>
      <SCounter>{counterValue}</SCounter>
      <SCounterButton onClick={handlePluseCounter}>증가</SCounterButton>
      <SCounterButton onClick={handleMinuseCounter}>감소</SCounterButton>
    </SContainer>
  );
}

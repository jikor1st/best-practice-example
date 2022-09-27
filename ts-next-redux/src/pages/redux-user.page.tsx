import type {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import NextLink from 'next/link';
import wrapper, { RootState } from '@/lib/store';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { fetchUser, updateUserEmail } from '@/lib/store/module';
import { connect } from 'react-redux';

const ReduxUserPage: NextPage<RootState> = ({ counter, user }) => {
  const dispatch = useAppDispatch();
  return (
    <div>
      <NextLink href={'/redux-counter'}>counter</NextLink>
      <br />
      <NextLink href={'/redux-user'}>user</NextLink>
      <div>
        <h4>thunk</h4>
        {Object.entries(user.value).map(([item, value]) => {
          return <p key={item}>{value}</p>;
        })}
        <button
          onClick={() => dispatch(updateUserEmail('updated-email@email.com'))}
        >
          update email
        </button>
      </div>
      <p>count : {counter.value}</p>
    </div>
  );
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  store => async context => {
    const status = store.getState().user.status;
    if (status === 'idle') {
      await store.dispatch(fetchUser());
    }

    return { props: {} };
  },
);

export default connect((state: RootState) => state)(ReduxUserPage);

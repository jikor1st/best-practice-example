import React from 'react';
import { useMounted } from '@/hooks/utils';

const SSRSafeSuspense = (
  props: React.ComponentProps<typeof React.Suspense>,
) => {
  const { fallback } = props;

  const isMounted = useMounted();

  if (isMounted) {
    return <React.Suspense {...props} />;
  }

  return <>{fallback}</>;
};

export default SSRSafeSuspense;

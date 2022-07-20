import { FC, ReactElement } from 'react';

import { useLoaderHints } from '../../hooks/useLoaderHints';
import { i18n } from '../../providers';
import { CircularProgress } from '../CircularProgress';
import './AsyncContent.css';

// eslint-disable-next-line react/function-component-definition
export const AsyncContent: FC<{ loading: boolean; children: ReactElement }> = ({
  loading,
  children,
}) => {
  const { key } = useLoaderHints();

  if (loading)
    return (
      <div className="async-content-container">
        <CircularProgress />
        <div>{i18n(key)}</div>
      </div>
    );

  return children;
};

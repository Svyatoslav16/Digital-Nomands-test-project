import { useEffect, useMemo, useState } from 'react';

import { SUCCESS_LOAD_CHANGE_TIME, REQUEST_TIMMEOUT } from '../contants/common';
import { useI18nContext } from '../providers';

const ERROR_TIMEOUT_TITLE = 'Error.Timeout';

export const useLoaderHints = () => {
  const { currLang, messages } = useI18nContext();
  const keys = useMemo(() => Object.keys(messages[currLang]), [currLang, messages]);
  const errorTimeoutKeyIndex = useMemo(
    () => keys.findIndex(key => key === ERROR_TIMEOUT_TITLE),
    [keys],
  );
  const [key, setKey] = useState({
    title: keys?.[0],
    index: 0,
  });

  useEffect(() => {
    if (!key.title) {
      setKey({
        title: keys?.[0],
        index: 0,
      });
    }
  }, [key.title, keys]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (errorTimeoutKeyIndex === -1) return;

      const timeout = (key.index + 1) * SUCCESS_LOAD_CHANGE_TIME > REQUEST_TIMMEOUT;

      if (timeout) {
        const foundErrorKeyIndex = keys.findIndex(key => key === ERROR_TIMEOUT_TITLE);
        if (foundErrorKeyIndex !== -1) {
          setKey({
            title: keys[foundErrorKeyIndex],
            index: foundErrorKeyIndex,
          });
        }
      }

      if (key.index !== errorTimeoutKeyIndex && !timeout) {
        setKey(prevState => {
          let nextIndex = prevState.index + 1;
          if (keys?.[nextIndex] === ERROR_TIMEOUT_TITLE) {
            nextIndex += 1;
          }

          if (keys?.[nextIndex]) {
            return {
              title: keys?.[nextIndex],
              index: nextIndex,
            };
          }

          return prevState;
        });
      }
    }, SUCCESS_LOAD_CHANGE_TIME);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, keys]);

  return { key: key.title };
};

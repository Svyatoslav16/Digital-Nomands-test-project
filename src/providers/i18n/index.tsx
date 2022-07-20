import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useContext,
} from 'react';

import { DEFAULT_MESSAGES } from '../../mocks';

import { I18nMessagesListItem } from './types';

const DEFAULT_LANGUAGE = 'en';

const I18nContext = createContext<{
  currLang: keyof I18nMessagesListItem;
  setCurrLang: () => string;
  messages: I18nMessagesListItem;
  setMessages: () => I18nMessagesListItem;
}>({
  currLang: DEFAULT_LANGUAGE,
  setCurrLang: () => DEFAULT_LANGUAGE,
  messages: {
    ru: {},
    en: {},
  },
  setMessages: () => ({
    ru: {},
    en: {},
  }),
});

export const I18nProvider: FC<{
  defaultLang?: keyof I18nMessagesListItem;
  messagesListUrl: string;
  children: ReactNode;
  // eslint-disable-next-line react/function-component-definition
}> = ({ defaultLang = 'en', messagesListUrl, children }) => {
  const [currLang, setCurrLang] = useState<keyof I18nMessagesListItem>(defaultLang);
  const [messages, setMessages] = useState<I18nMessagesListItem>({
    en: {},
    ru: {},
  });

  const providerValue = useMemo(
    () => ({
      currLang,
      setCurrLang: setCurrLang as () => string,
      messages,
      setMessages: setMessages as () => I18nMessagesListItem,
    }),
    [currLang, messages],
  );

  const fetchMessagesList = useCallback(async (url: string) => {
    // server download emulation
    // const messagesListResponse = await fetch(url);
    // if (messagesListResponse.ok) {
    //   const messagesListData: I18nMessagesListItem = await messagesListResponse.json();

    //   if (messagesListData) {
    //     setMessages(messagesListData);
    //   }
    // }
    setTimeout(() => {
      setMessages(DEFAULT_MESSAGES);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchMessagesList(messagesListUrl);
  }, [messagesListUrl, fetchMessagesList]);

  return <I18nContext.Provider value={providerValue}>{children}</I18nContext.Provider>;
};

export const useI18nContext = () => {
  return useContext(I18nContext);
};

export const i18n = (key: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { currLang, messages } = useI18nContext();

  return messages[currLang][key] || key;
};

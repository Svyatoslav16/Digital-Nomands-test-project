import { useEffect, useState } from 'react';

import { AsyncContent } from './components/AsyncContent/AsyncContent';
import { SomeConvenientWidget } from './components/SomeConvenientWidget';
import './App.css';
import { REQUEST_TIMMEOUT } from './contants/common';
import { I18nProvider } from './providers';

const SUCCESS_REQUEST_TIMMEOUT = REQUEST_TIMMEOUT - 100;

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Эмуляция успешной загрузки
    // const successRequest = setTimeout(() => {
    //   setLoading(false);
    // }, SUCCESS_REQUEST_TIMMEOUT);

    // return () => clearTimeout(successRequest);
  }, []);

  return (
    <div className="App">
      <I18nProvider messagesListUrl="">
        <AsyncContent loading={loading}>
          <SomeConvenientWidget />
        </AsyncContent>
      </I18nProvider>
    </div>
  );
}

export default App;

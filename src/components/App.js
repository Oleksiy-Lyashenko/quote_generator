import loadImg from './assets/load.svg';
import arrowImg from './assets/arrow.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [quote, setQuote] = useState({});
  const [modalWindow, setModalWindow] = useState(false);

  useEffect(() => {
    fetchQuote();
  }, []);

  async function fetchQuote() {
    try {
      const { data } = await axios.get('https://quotable.io/random');

      setQuote({ ...data });
    } catch (error) {
      console.error(error);
    }
  }

  const openModalWindow = () => {
    setModalWindow(!modalWindow);
  };

  return (
    <div className="page">
      <div className="wrapper">
        <header className="header">
          <button className="header__button" onClick={fetchQuote}>
            <span className="header__button__title">random</span>
            <img src={loadImg} alt="" className="header__button__load" />
          </button>
        </header>

        {quote && (
          <main className="quote">
            <p className="quote__text">{quote.content}</p>

            <div className="quote__author" onClick={openModalWindow}>
              <div className="quote__box">
                <p className="quote__name">{quote.author}</p>
                <p className="quote__position">{quote.tags}</p>
              </div>

              <img src={arrowImg} alt="" className="quote__arrow" />
            </div>
          </main>
        )}

        {modalWindow && (
          <div className="modal-window">
            <div className="modal-window__content">
              <div className="modal-window__container">
                <p className="modal-window__title">QuoteGarden doesn't work</p>

                <button className="modal-window__button" onClick={openModalWindow}>
                  close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

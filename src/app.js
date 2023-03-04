import * as yup from 'yup';
import i18next from 'i18next';
import view from './view.js';
import resources from './locales/index.js';

// схема валидации. возвращает Promise
const validateUrl = (state, url) => {
  const schema = yup.string()
    .url()
    .notOneOf(state.channels);
  return schema.validate(url);
};

const runApp = (state, elements) => {
  const { form } = elements;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');
    // после валидации получаем Promise, если валидно
    // то меняем в state статус и пушим новый url
    validateUrl(state, url)
      .then(() => {
        state.rssForm.status = 'valid';
        state.channels.push(url);
      })
      .catch((err) => {
        state.rssForm.status = 'invalid';
        state.rssForm.errors = err;
      });
  });
};
// инициализация приложения 1 раз
const initApp = () => {
  const defaultLanguage = 'ru';
  const i18n = i18next.createInstance();
  i18n.init({
    lng: defaultLanguage,
    debug: false,
    resources,
  })
    .then(() => {
      yup.setLocale({
        string: {
          url: 'invalidUrlError',
        },
        mixed: {
          notOneOf: 'existUrlError',
        },
      });
      const initialState = {
        channels: [],
        rssForm: {
          status: 'invalid',
          errors: [],
        },
      };
      const elements = {
        form: document.querySelector('form'),
        input: document.getElementById('url-input'),
        feedback: document.querySelector('.feedback'),
      };
      const state = view(initialState, elements, i18n);

      runApp(state, elements);
    })
    .catch((e) => console.error(e));
};

export default initApp;

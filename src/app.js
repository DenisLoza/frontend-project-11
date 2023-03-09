import i18next from 'i18next';
import onChange from 'on-change';
import { string, setLocale } from 'yup';
import {
  renderRssForm,
  renderRssFormError,
} from './view.js';
import resources from './locales/index.js';

const validateUrl = (state, url) => {
  const schema = string().url().notOneOf(state.channels);
  return schema.validate(url);
};

const runApp = (initialState, elements, i18n) => {
  const state = onChange(initialState, (path, value) => { // previousValue
    switch (path) {
      case 'rssForm.status':
        renderRssForm(value, elements);
        break;
      case 'channels':
        break;
      case 'rssForm.errors':
        renderRssFormError(value, elements, i18n);
        break;
      default:
        throw new Error(`Unknown state path: ${path}`);
    }
  });

  const { form } = elements;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');

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

const initApp = () => {
  const defaultLanguage = 'ru';
  const i18n = i18next.createInstance();
  i18n.init({
    lng: defaultLanguage,
    debug: false,
    resources,
  })
    .then(() => {
      setLocale({
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
      // const state = view(initialState, elements, i18n);

      runApp(initialState, elements, i18n);
    })
    .catch((e) => console.error(e));
};

export default initApp;

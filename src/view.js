import onChange from 'on-change';

// работа с DOM деревом
// если изменяется state.rssForm.status, то меняем class у input
// удаляем данные из input и ставим фокус
const renderRssForm = (state, elements) => {
  const { form, input } = elements;
  if (state.rssForm.status === 'invalid') {
    input.classList.add('is-invalid');
  } else {
    input.classList.remove('is-invalid');
    form.reset();
    input.focus();
  }
};
// ф-ция проверяет если в path попадает значение из case
// то вызывается renderRssForm
const render = (state, path, elements) => {
  switch (path) {
    case 'rssForm.status':
    case 'rssForm.errors':
    case 'channels':
      renderRssForm(state, elements);
      break;
    default:
      throw new Error(`Unknown state path: ${path}`);
  }
};
// передаем стейт в onChange и передаем path в ф-цию render
// path - это путь к элементу, который изменился в объекте state
const view = (state, elements) => onChange(state, (path) => {
  render(state, path, elements);
});

export default view;

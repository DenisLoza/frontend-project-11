const makeLinkVisited = (event) => {
  event.target.classList.remove('fw-bold');
  event.target.classList.add('fw-normal', 'link-secondary');
};

const createCardAndTitle = (titleTranslation, i18n) => {
  const card = document.createElement('div');
  card.classList.add('card', 'border-0');

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h2');
  cardTitle.classList.add('card-title', 'h4');
  cardTitle.innerHTML = i18n.t(titleTranslation);

  const elList = document.createElement('ul');
  elList.classList.add('list-group', 'border-0', 'rounded-0');
  cardBody.append(cardTitle);
  card.append(cardBody);
  return { card, elList };
};

const renderPostsCard = (postsData, elements, i18n) => {
  const { postsContainer } = elements;
  const { card, elList } = createCardAndTitle('postsTitle', i18n);
  postsData.forEach((postData) => {
    const { title, link, id } = postData;
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    a.classList.add('fw-bold');
    a.addEventListener('click', (e) => makeLinkVisited(e));
    a.dataset.id = id;
    a.innerHTML = title;
    Object.assign(a, { href: link, target: '_blank', rel: 'noopener noreferrer' });
    const button = document.createElement('button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.dataset.id = id;
    button.dataset.bsToggle = 'modal';
    button.dataset.bsTarget = '#modal';
    button.innerHTML = i18n.t('btnWatchMore');
    button.setAttribute('type', 'button');
    li.append(a, button);
    elList.append(li);
  });
  card.append(elList);
  postsContainer.replaceChildren(card);
};

const renderFeedsCard = (feedsData, elements, i18n) => {
  const { feedsContainer } = elements;
  const { card, elList } = createCardAndTitle('feedsTitle', i18n);
  feedsData.forEach((feedData) => {
    const { title, description } = feedData;
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.innerHTML = title;
    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.innerHTML = description;
    li.append(h3, p);
    elList.append(li);
  });
  card.append(elList);
  feedsContainer.replaceChildren(card);
};

const renderClearForm = (elements) => {
  const { input, formSubmitButton, feedback } = elements;
  feedback.classList.remove('text-success');
  feedback.classList.remove('text-danger');
  feedback.innerHTML = '';
  input.classList.remove('is-invalid');
  input.removeAttribute('readonly');
  formSubmitButton.removeAttribute('disabled');
};

const renderRssFormError = (error, elements, i18n) => {
  renderClearForm(elements);
  const { input, feedback } = elements;
  input.classList.add('is-invalid');
  feedback.innerHTML = i18n.t(error.message);
  feedback.classList.add('text-danger');
};

const renderRssFormFeedback = (status, elements, i18n) => {
  renderClearForm(elements);
  const { input, formSubmitButton, feedback } = elements;
  switch (status) {
    case 'invalid':
      input.classList.add('is-invalid');
      break;
    case 'processing':
      input.setAttribute('readonly', 'true');
      formSubmitButton.setAttribute('disabled', 'disabled');
      break;
    case 'downloaded':
      feedback.classList.add('text-success');
      feedback.innerHTML = i18n.t('rssSuccessedLoad');
      break;
    default:
      throw new Error(`Unknown form render status: ${status}`);
  }
};

export {
  renderRssFormFeedback,
  renderRssFormError,
  renderPostsCard,
  renderFeedsCard,
};

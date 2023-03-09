import { uniqueId } from 'lodash';

export default (rawXML) => {
  const parser = new DOMParser();
  const XMLDocument = parser.parseFromString(rawXML, 'application/xml');
  const errorNode = XMLDocument.querySelector('parsererror');
  if (errorNode) throw new Error('XMLdocumentParsingError');

  const parsedFeed = {
    title: XMLDocument.querySelector('title').textContent,
    description: XMLDocument.querySelector('description').textContent,
    link: XMLDocument.querySelector('link').textContent,
    id: uniqueId(),
  };

  const posts = XMLDocument.querySelectorAll('item');
  const parsedPosts = Array.from(posts).map((post) => ({
    title: post.querySelector('title').textContent,
    description: post.querySelector('description').textContent,
    link: post.querySelector('link').textContent,
    feedID: parsedFeed.id,
    id: uniqueId(),
  }));
  return { parsedFeed, parsedPosts };
};

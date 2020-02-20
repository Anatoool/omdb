import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import Root from '../../src/containers/root';

const path = require('path');
const fs = require('fs');

const filePath = path.resolve('./build/assets/ssr-index.html');
const htmlData = fs.readFileSync(filePath, 'utf8');
const statsFile = path.resolve('./build/assets/loadable-stats.json');

export default (req, res) => {
  // configure store
  const reduxState = req.store.getState();
  const stringifiedReduxState = JSON.stringify(reduxState).replace(/</g, '\\u003c'); // because XSS

  // render the app as a string
  const context = {};
  const extractor = new ChunkExtractor({ statsFile, entrypoints: ['app'] });

  const applicationHTML = ReactDOMServer.renderToString(
    <StaticRouter location={req.url} context={context}>
      <Provider store={req.store}>
        <ChunkExtractorManager extractor={extractor}>
          <Root />
        </ChunkExtractorManager>
      </Provider>
    </StaticRouter>,
  );
  const helmet = Helmet.renderStatic();

  const scriptTags = extractor.getScriptTags(); // get @loadable/components script tags
  const linkTags = extractor.getLinkTags(); // get @loadable/components link tags (prefetch css and js files)
  const styleTags = extractor.getStyleTags(); // get @loadable/components style tags

  // inject the rendered app into our html and send it

  res.set({
    'Content-Type': 'text/html',
  });

  let resultHtml = htmlData.replace(
    '<title>Evapixel</title>',
    `${helmet.title.toString()}${helmet.meta.toString()}`,
  );

  resultHtml = resultHtml.replace(
    '<div id="root"></div>',
    `<div id="root">${applicationHTML}</div>${scriptTags}<script>window.REDUX_STATE = ${stringifiedReduxState};</script>`,
  );

  resultHtml = resultHtml.replace(
    '<meta name="head-ssr-replace">',
    `${linkTags}${styleTags}`,
  );

  const { siteCode = {} } = req;
  const { headHtml = '', bodyHtml = '' } = siteCode;
  resultHtml = resultHtml.replace(
    '<meta name="head-site-code-replace">',
    `${headHtml || ''}`,
  );
  resultHtml = resultHtml.replace(
    '<div id="body-site-code-replace"></div>',
    `${bodyHtml || ''}`,
  );

  return res.send(resultHtml);
};

import { CLIENT_PAGES } from '../../src/consts';
import { getHomepageDataMiddleware } from './homepage/getHomegageData';
import { configureStore } from '../../src/store';

const router = require('express').Router();

router.get('/*', async (req, res, next) => {
  req.asyncRequestsBeforeSSR = [];
  req.store = configureStore({});
  next();
});

router.get(`${CLIENT_PAGES.HOME}`, getHomepageDataMiddleware);

router.get('/*', async (req, res, next) => {
  const { asyncRequestsBeforeSSR = [] } = req;

  await Promise.all(asyncRequestsBeforeSSR.map((request) => request()));

  next();
});

export default router;

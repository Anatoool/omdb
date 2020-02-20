import React from 'react';
import loadable from '@loadable/component';
import { Route } from 'react-router-dom';
import { CLIENT_PAGES } from 'consts';
import HomeContainer from './HomeContainer';

const MovieDetailsContainer = loadable(() => import(/* webpackPrefetch: true */ './MovieDetailsContainer'));

export const CommonContainers = () => (
  <main>
    <Route exact path={CLIENT_PAGES.HOME} component={HomeContainer} />
    <Route exact path={CLIENT_PAGES.MOVIE_DETAILS(':id')} component={MovieDetailsContainer} />
  </main>
);

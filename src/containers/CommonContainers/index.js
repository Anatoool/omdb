import React from 'react';
import loadable from '@loadable/component';
import { Route } from 'react-router-dom';
import { CLIENT_PAGES } from 'consts';
import HomeContainer from './HomeContainer';

// const AboutContainer = loadable(() => import(/* webpackPrefetch: true */ './about/about.container'));

export const CommonContainers = () => (
  <main>
    <Route exact path={CLIENT_PAGES.HOME} component={HomeContainer} />
    {/*<Route exact path={CLIENT_PAGES.ABOUT} component={AboutContainer} />*/}
  </main>
);

import path from 'path';
import express from 'express';
import serverRender from './utils/serverRender';
import ssrRoutes from './ssr-routes/root';
import { STATIC_PATHNAME, PORT, HOST } from './config';

const compression = require('compression');

const app = express();
app.disable('x-powered-by');
app.use(compression());

app.use(STATIC_PATHNAME, express.static(path.resolve('./build/assets')));
app.use(ssrRoutes);
app.get('/*', serverRender);

app.listen(PORT, HOST, () => console.log(`Server listening on port: ${PORT}`));

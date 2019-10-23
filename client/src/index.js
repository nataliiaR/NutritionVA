import ReactDOM from 'react-dom';
import './index.css';

import { makeMainRoutes } from './App';

const routes = makeMainRoutes();

ReactDOM.render(routes, document.getElementById('root')
);

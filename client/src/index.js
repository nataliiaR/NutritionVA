import React from "react";
import ReactDOM from "react-dom";
import MakeMainRoutes from './App';
import * as registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<MakeMainRoutes />, document.getElementById('root'));
registerServiceWorker.register();

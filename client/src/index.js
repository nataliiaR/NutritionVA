import React from "react";
import ReactDOM from "react-dom";
import MakeMainRoutes from './App';
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<MakeMainRoutes />, document.getElementById('root'));
registerServiceWorker();

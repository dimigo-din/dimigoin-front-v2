import React from 'react';
import ReactDOM from 'react-dom';

import 'typeface-nanum-square-round';

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

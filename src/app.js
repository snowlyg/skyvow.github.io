import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import routes from './routes/index'
import './assets/styles/main'

ReactDOM.render(<Router history={browserHistory} routes={routes} />, document.getElementById('app'))

import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import 'emoji-mart/css/emoji-mart.css';
import './scss/style.scss';

const Main: React.FC = () => (
  <Router basename="/">
    <App />
  </Router>
);

ReactDOM.render(<Main />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}

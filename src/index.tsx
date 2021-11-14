import ReactDOM = require('react-dom');
import App from './App';
import Wrapper from './components/wrapper';

ReactDOM.render(
  <Wrapper>
    <App />
  </Wrapper>,
  document.querySelector('#root')
);

// new Worker('./worker.ts');

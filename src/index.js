import reactDom from 'react-dom';
import { App } from './front-end';
import './App.css'; // Ensure CSS is imported

reactDom.render(
  <div>
    <App/>
  </div>,
  document.getElementById('root')
);

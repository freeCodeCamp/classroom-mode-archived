import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

const Landing = () => <h1>Landing</h1>;

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path='/' component={Landing} />
        </div>
      </BrowserRouter>
    </div>
    );
};

export default App;
import React from 'react';

import {Link} from 'react-router-dom';

class Head extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="container">
          <Link className="logo-box" to="/">WE-INVEST</Link>
        </div>
      </div>
    );
  }
}

export default Head;

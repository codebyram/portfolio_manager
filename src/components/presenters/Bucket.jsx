import React from 'react';

import {Link} from 'react-router-dom';

class Head extends React.Component {
  render() {
    return (
      <div className="portfolio-wrap col-12">
        <div className="banner col-12">
          <div className="detail-bar row m-0">
            <div className="duration col-12">{this.props.name}</div>
          </div>
        </div>
        <div className="portfolio-details col-12">
          <div className="data-row row">
            <div className="col-6 data-title">Volatility</div>
            <div className="col-6 data-value">{this.props.volatility}</div>
          </div>
          <div className="data-row row">
            <div className="col-6 data-title">Mean Return</div>
            <div className="col-6 data-value">{this.props.mean_return}</div>
          </div>
          <div className="row">
            <div className="col-12 p-0">
              <Link className="button medium button--secondary col-12" to={`/customize/${this.props.id}`}>Explore Investment Idea</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Head;

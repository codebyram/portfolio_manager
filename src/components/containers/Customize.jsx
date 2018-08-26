import React from 'react';
import {connect} from 'react-redux';

import customizeActions from '../../actions/customizeActions';
import customizeSelector from '../../selectors/customizeSelector';

import List from '../core/List';
import CategoryList from './CategoryList';
import withLoader from '../core/withLoader';

class Customize extends React.Component {

  componentWillMount() {
    if(this.props.fetching === undefined) {
      this.props.fetchConstituents();
    }
  }

  render() {
    return (
      <div className="row">
        <div className="customize-title col-12">
          <h1>Portfolio Constituents</h1>
          <div className="control-box">
            <button className="button button--primary medium" onClick={this.props.reset}>Reset</button>
            <button className="button button--primary medium" onClick={this.props.rebalance}>Rebalance</button>
            <button className="button button--primary medium">Save and Continue</button>
          </div>
        </div>
        <div className="customize-container col-12">
          <div className="list-title row">
            <div className="col-8">Cateogry/Stock</div>
            <div className="col-2">Model Weight (%)</div>
            <div className="col-2">Weight (100%)</div>
          </div>
          <List
            childComponent={CategoryList}
            data={this.props.categoryList}
            childProps={{
              weightChanged: this.props.weightChanged,
              toggleLock: this.props.toggleLock,
              delete: this.props.delete
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state,props) => {
  return customizeSelector(state,props);
}

const mapDispatchToProps = (dispatch) => {
  return customizeActions(dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(Customize, 'fetching'));

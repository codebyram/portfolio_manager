import React from 'react';
import {connect} from 'react-redux';

import listingActions from '../../actions/listingActions';
import listingSelector from '../../selectors/listingSelector';

import List from '../core/List';
import withLoader from '../core/withLoader';

import Bucket from '../presenters/Bucket';

class Listings extends React.Component {

  componentWillMount() {
    if(this.props.fetching === undefined) {
      this.props.fetchListing();
    }
  }

  render() {
    return (
      <div className="row">
        <div className="listing-title col-12">
          <h2 className="text-center">Here are few recommondation for you to choose from</h2>
        </div>
        <div className="listing-container container d-flex">
          <List
            childComponent={Bucket}
            data={this.props.listing}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return listingSelector(state);
}

const mapDispatchToProps = (dispatch) => {
  return listingActions(dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoader(Listings, 'fetching'));

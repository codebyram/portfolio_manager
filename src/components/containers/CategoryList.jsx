import React from 'react';

import List from '../core/List';
import Spinner from '../core/Spinner';
import createForm from '../core/createForm';

const Item = (props) => {
  return(
    <div className="item col-12 d-flex">
      <div className="col-4"><strong>
        <a href="#" onClick={(e)=>{
          e.preventDefault();
          props.delete(props.id)
        }}>
        <i className="icon ion-md-trash color-danger"></i>
        </a>&nbsp;
        {props.name}
      </strong></div>
      <div className="col-4"><a href="" onClick={(e) => {
          e.preventDefault();
          props.toggleLock(props.id, !props.locked);
        }}
      >
        {props.locked ? 'unlock' : 'lock'}
      </a></div>
      <div className="col-2 text-center">{props.weight}</div>
      <div className="col-2">
        <Spinner
          name={props.id}
          value={props.editWeight}
          step={1}
          min={0}
          suffix="%"
          onChange={(val) => {
            props.weightChanged(props.id, val)
          }}
        />
      </div>
    </div>
  )
}

class CategoryList extends React.Component {
  render(){
    return(
      <div className="category-list row">
        <div className="category-title col-12 d-flex">
          <div className="col-4"><strong>Bond</strong></div>
          <div className="col-4"><a href="#"><i className="icon ion-md-add"></i> Add Bond</a></div>
          <div className="col-2 text-center">{this.props.totalWeight}%</div>
          <div className="col-2 text-center">{this.props.totalEditWeight}%</div>
        </div>
        <List
          childComponent={Item}
          data={this.props.list}
          childProps={{
            weightChanged: this.props.weightChanged,
            toggleLock: this.props.toggleLock,
            delete: this.props.delete
          }}
        />
      </div>
    )
  }
}

export default createForm(CategoryList);
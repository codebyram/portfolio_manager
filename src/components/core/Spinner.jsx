import React from 'react';

import createFormInput from './createFormInput';

class Spinner extends React.Component {
  increment(){
    if(this.props.max !== undefined && this.props.max === this.props.value)
      return;
    let step = this.props.step ? this.props.step : 0;
    let value = this.props.value + step;
    this.props.onChange(Math.round(value*100) / 100);
  }

  decrement(){
    if(this.props.min !== undefined && this.props.min === this.props.value)
      return;
    let step = this.props.step ? this.props.step : 0;
    let value = this.props.value - step;
    this.props.onChange(Math.round(value*100) / 100);
  }

  render() {
    let disableInc = this.props.max !== undefined && this.props.max === this.props.value ;
    let disableDec = this.props.min !== undefined && this.props.min === this.props.value ;
    return(
      <div className="spinner">
        <div className="spinner-controls d-flex">
          <span className={disableDec ? "rnd-btn disabled" : "rnd-btn"} onClick={this.decrement.bind(this)}>-</span>
          <input
            className="spinner-value flex-fill"
            value={this.props.value ? this.props.value : 0}
            onChange={(e) => {
              let value = e.target.value;
              if(value == '') {
                this.props.onChange(0);
              }
              if(!isNaN(parseFloat(value)) ){
                this.props.onChange(Math.round(value * 100) / 100)
              }
            }}
          />
          <span className={disableInc ? "rnd-btn disabled" : "rnd-btn"} onClick={this.increment.bind(this)}>+</span>
        </div>
      </div>
    );
  }
}

export default createFormInput(Spinner);

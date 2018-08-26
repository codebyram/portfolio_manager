import React from 'react';
import PropTypes from 'prop-types';

import createFormStore from '../../utils/createFormStore';

export default function createFrom (FormComponent) {

  class Form extends React.Component {

    constructor(props) {
      super(props);
      this.valueStore = createFormStore(this.props.data || {});
      this.errorStore = createFormStore();
      this.setUpStore();
    }

    setUpStore() {
      this._valueStoreSubscriber = this.onValueStoreChange.bind(this);
      this._unsubscribeValueStore = this.valueStore.subscribe(this._valueStoreSubscriber);
      this._errorStoreSubscriber = this.onErrorStoreChange.bind(this);
      this.unsubscribeErrorStore = this.errorStore.subscribe(this._errorStoreSubscriber);
    }

    componentWillMount() {
      this.setUpStore();
      if(this.props.submitTrigger) {
        this.props.submitTrigger(this.handleSubmit.bind(this))
      }
    }

    willComponentUnMount() {
      this.clearSubscriptions();
      this.valueStore = null;
      this.errorStore = null;
    }

    onValueStoreChange(type, payload) {
      if(this.props.onChange) {
        if(type === 'change') {
          let { prop, value } = payload;
          this.props.onChange(prop, value);
        } else if (type === 'submit') {
          this.handleSubmit();
        }
      }
    }

    onErrorStoreChange(type, {prop,value}) {

    }

    handleSubmit() {
      let {valueStore, errorStore} = this.getChildContext();
      valueStore.trigger('forceValidate');
      let errors = errorStore.getAll();
      if(Object.keys(errors).length === 0) {
        const data = valueStore.getAll();
        if(this.props.onSubmit)
          this.props.onSubmit(data);
        return data;
      } else {
        return null;
      }
    }

    getChildContext() {
     return {
        valueStore : this.valueStore,
        errorStore : this.errorStore
      }
    }

    clearSubscriptions(){
      if (this._unsubscribeValueStore) {
        this._unsubscribeValueStore();
      }
      if (this.unsubscribeErrorStore) {
        this.unsubscribeErrorStore();
      }
    }

    render() {
      return (
        <FormComponent { ...this.props } onSubmit={this.handleSubmit.bind(this)}>
          {this.props.children}
        </FormComponent>
      )
    }
  }

  Form.childContextTypes = {
    valueStore : PropTypes.object,
    errorStore : PropTypes.object
  }
  
  return Form;
}
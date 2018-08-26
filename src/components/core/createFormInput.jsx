import React from 'react';
import PropTypes from 'prop-types';

import createValidator from '../../utils/createValidator';

export default function createFromInput (InputComponent) {
  class FormInput extends React.Component {

    constructor(props) {
      super(props);
      this._valueStoreSubscriber = this.onValueStoreChange.bind(this);
      this._errorStoreSubscriber = this.onErrorStoreChange.bind(this);
      this.state = {
        isPristine: true,
        hasError: false,
        errorMessage: ''
      };
    }

    componentWillMount() {
      this.setState({ ...this.state, value: this.props.value});
      this.context.valueStore.set(this.props.name, this.props.value, true);
      this.context.valueStore.subscribe(this._valueStoreSubscriber);
      this.context.errorStore.subscribe(this._errorStoreSubscriber);
    }

    componentWillReceiveProps(newProps) {
      if(newProps.value !== undefined && newProps.value !== this.state.value) {
        this.setState({ ...this.state, value: newProps.value});
        this.context.valueStore.set(this.props.name, newProps.value);
      }
    }

    setUpValidations() {
      if(!this._validations && this._validations !== this.props.validations) {
        this._validations = this.props.validations;
        this.validator = createValidator(this._validations);
        this.setUpSiblingValidationIndex();
      }
    }

    setUpSiblingValidationIndex(){
      var self = this;
      this._dependentSiblings = this.props.validations.reduce((result, item) => {
        if(item.element !== self.props.name && item.element !== undefined) {
          if(result.indexOf(item.element) < 0) {
            result.push(item);
          }
        }
        return result;
      },[]);
    }

    getPropsForChild() {
      let {hasError, errorMessage , value} = this.state;
      let newProps = {};
      Object.keys(this.props).map((prop) => {
        if (prop !== 'validations') {
          newProps[prop] = this.props[prop];
        }
        return null;
      });
      return {
        ...newProps,
        hasError, errorMessage, value ,
        onChange : this.handleChange.bind(this)
      };
    }

    render() {
      this.setUpValidations();
      let childProps = this.getPropsForChild();
      return(
        <InputComponent {...childProps} >
          {this.props.children}
        </InputComponent>
      )
    }

    handleChange(value) {
      this.setState({
        ...this.state,
        value: value
      });
      this.context.valueStore.set(this.props.name, value);
      if(this.props.onChange) {
        this.props.onChange(value);
      }
    }

    runValidator(name, value) {
      if(this.validator === undefined) {
        return [];
      }
      if(name === this.props.name) {
        return this.validator(value);
      } else {
        return this.validator(this.context.valueStore.get(this.props.name), {name, value})
      }
    }

    forceValidate(){
      let error = this.runValidator(this.props.name, this.context.valueStore.get(this.props.name));
      let siblings = this._dependentSiblings;
      if(error.length === 0 && siblings) {
        for(let i =0, length = siblings.length; i < length; i++) {
          error = this.runValidator(siblings[i], this.context.valueStore.get(siblings[i]));
          if(error.length > 0) {
            return error;
          }
        }
      } else {
        return error;
      }
    }

    onValueStoreChange(type, payload) {
      let error = [];
      switch(type) {
        case 'change' :
          let {prop, value} = payload;
          error = this.runValidator(prop, value)
          break;
        case 'forceValidate':
          error = this.forceValidate();
          break;
      }
      if(error === undefined || error.length === 0) {
        this.context.errorStore.unSet(this.props.name);
      } else {
        this.context.errorStore.set(this.props.name, error[0]);
      }
    }

    onErrorStoreChange(type, {prop, value}) {
      if(prop === this.props.name) {
        this.setState({
          ...this.state,
          hasError: value ? true : false,
          errorMessage: value ? value : ''
        });
      }
    }
  }

  FormInput.contextTypes = {
    valueStore : PropTypes.object,
    errorStore : PropTypes.object
  }

  return FormInput
}

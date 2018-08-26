import React from 'react';

export default function withLoader (Component, loadingFlag) {
  return (props) => {
    if(props[loadingFlag] === true) {
      return(
        <div className="spinner-loader">
        </div>
      )
    } else {
      return(
        <Component {...props} />
      )
    }
  }
}

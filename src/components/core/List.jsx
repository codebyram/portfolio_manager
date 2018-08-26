import React from 'react';

class ListItem extends React.Component {
  render() {
    return (
      <li className={this.props.className}>
        {this.props.children}
      </li>
    );
  }
}

class List extends React.Component {
  renderChild(item) {
    let ChildComponent = this.props.childComponent;
    return (
      <ChildComponent {...item} {...this.props.childProps} />
    );
  }

  renderChildren() {
    if(!this.props.data )
      return;
    return this.props.data.map((item,i) => {
      return (
        <ListItem key={item.id ? item.id : i}>
          {this.renderChild(item)}
        </ListItem>
      );
    })
  }

  render() {
    return(
      <ul className={this.props.className}>
        {this.renderChildren()}
      </ul>
    );
  }
}

export default List;
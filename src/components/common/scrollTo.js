import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class ScrollTo extends Component {
  componentDidMount() {
    const x = this.props.x || 0;
    const y = this.props.y || 140;
      window.scrollTo(x, y);
  }

  render() {
    return null
  }
}

export default withRouter(ScrollTo)
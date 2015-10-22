'use strict';

import React, { Component } from 'react';
import Radium from 'radium';
import styler from 'react-styling';


@Radium
export default class DemoComponent extends Component {
  render() {
    let text = (this.props.hasText) ? 'ANDREA WAS HERE' : 'WHERE IS ANDREA';
    return <div>{text}</div>;
  }

}
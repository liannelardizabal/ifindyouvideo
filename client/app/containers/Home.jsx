'use strict';

import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Radium from 'radium';
import { Link } from "react-router";
import styler from 'react-styling';

@Radium
export default class Home extends Component {

  render() {
    return (
      <div>
        <div>Test</div>
        <Link to="/Demo">Demo</Link>
      </div>
    );
  }

}

const styles = styler`
`;

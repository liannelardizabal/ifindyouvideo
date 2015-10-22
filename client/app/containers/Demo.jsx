'use strict';

import React, { Component } from 'react';
import DocumentTitle from 'react-document-title';
import Radium from 'radium';
import styler from 'react-styling';
import DemoComponent from '../components/DemoComponent.jsx';

@Radium
export default class Demo extends Component {

  state = {
    hasText: true
  };


  onClickDemo = () => {
    this.setState({hasText: !this.state.hasText});
  };

  render() {
    return (
      <div>
        <h1> asd </h1>
        <div onClick={this.onClickDemo}> CLIKCKKCKC </div>
        <DemoComponent hasText={this.state.hasText} />
      </div>
    );
  }

}

const styles = styler`
`;

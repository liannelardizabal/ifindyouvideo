'use strict';

import React, { Component } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Radium from 'radium';
import styler from 'react-styling';
import SearchPopover from './SearchPopover.jsx';

@Radium
class HomeSearch extends Component {

  state = {
    searchTerm: '',
    index: -1,
    cities: [
      'Vancouver, BC',
      'Vatican City',
      'San Francisco, CA',
      'Virginia',
      'New York City, NY',
      'Seattle, WA'
    ],
    enter: false
  };

  handleChange = event => {
    this.setState({searchTerm: event.target.value});
  };

  keyTyped = event => {
    var keyCode = event.keyCode | event.which;
    var oldIndex = this.state.index;

    if(keyCode == 38){
      if (oldIndex >= 0){
        this.setState({index: oldIndex-1});
      }
    }
    else if (keyCode == 40){
      this.setState({index: oldIndex + 1});
    }
    else if (keyCode == 13 && oldIndex == -1) {
      var searchCity = this.state.searchTerm
      this.props.history.pushState({ city: searchCity},
        (searchCity && searchCity.length > 0) ? `/videos?city=${searchCity}` : '/videos'
      )}

    else if (keyCode == 13 && oldIndex > -1){
      this.setState({enter: true});
    }
  };

  reduceIndex = () => {
    var oldIndex = this.state.index;
    this.setState({index: oldIndex-1});
  };

  resetEnter = () => {
    this.setState({enter: false});
  };

  componentDidMount = () => {
    this.refs.citySearch.focus();
    window.addEventListener('keydown', this.keyTyped, false);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.keyTyped);
  }

  componentDidUpdate = () => {
    var textbox = this.refs.citySearch;
    var length = textbox.value.length*2;
    if(this.state.index == -1){
      textbox.focus();
      setTimeout(() => {
        textbox.setSelectionRange(length,length);
      }, 0);
    }
    else {
      textbox.blur();
    }
  };

  render() {
    return (
      <div style={styles.homeSearch}>
        <SearchPopover searchTerm={this.state.searchTerm}
                       cities={this.props.cities}
                       index={this.state.index}
                       reduceIndex={this.reduceIndex}
                       enter={this.state.enter}
                       resetEnter={this.resetEnter}
                       history={this.props.history} />
        <i className='material-icons' style={[styles.icon, styles.searchIcon]}>search</i>
        <input type='text' style={styles.searchInput} ref='citySearch'
               placeholder='Search for a trendy city'
               onChange={this.handleChange} />
        <button style={styles.optionsButton}>
          <i className='material-icons' style={styles.icon}>more_vert</i>
        </button>
        <div style={styles.clearfix} />
      </div>
    );
  }

}

export default Relay.createContainer(HomeSearch, {
  fragments: {
    cities: () => Relay.QL`
      fragment on City @relay(plural: true) {
        ${SearchPopover.getFragment('cities')}
      }
    `
  }
});

const styles = styler`
  homeSearch
    max-width: 600px
    margin: 0 auto
    position: relative

  icon
    background-image: linear-gradient(to bottom, rgba(239,46,81,1) 7%, rgba(241,72,75,1) 30%, rgba(248,152,56,1) 100%)
    background-clip: text
    text-fill-color: transparent
    font-size: 28px
    line-height: 60px

  searchIcon
    width: 106px
    margin-right: 44px
    display: block
    float: left
    text-align: center

  searchInput
    background: none
    border: none
    outline: none
    display: inline-block
    line-height: 40px
    padding: 10px 0
    font-family: inherit
    font-size: 16px
    float: left
    color: rgba(102,102,102,1)
    position: relative
    z-index: 1
    width: 300px

  optionsButton
    width: 40px
    float: right
    display: block
    text-align: center
    background: none
    outline: none
    border: none
    padding: 0

  clearfix
    clear: both
    display: table
`;

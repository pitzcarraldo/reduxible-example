import React, { Component } from 'react';
import iOSTheme from 'reapp-ui/themes/ios/theme';
import Theme from 'reapp-ui/helpers/Theme';
import LayoutLeftNav from 'reapp-ui/views/LayoutLeftNav';
import Nav from '../../components/Nav';

export default class App extends Component {
  render() {
    return (
      <Theme {...iOSTheme}>
        <LayoutLeftNav
          side={Nav}
          handle={handle}
          draggable={false}>
          {this.props.children}
        </LayoutLeftNav>
      </Theme>
    );
  }
}
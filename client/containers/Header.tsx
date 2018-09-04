import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect, MapDispatchToProps } from 'react-redux';

import CityDoLogo from '../components/Logo';
import User from '../components/User';
import './Header.less';

interface IActionProps {
  actions: {
  };
}
const mapDispatchToProps: MapDispatchToProps<IActionProps, {}> = (dispatch) => ({
  actions: bindActionCreators({
  }, dispatch),
});

class Header extends Component<IActionProps> {
  public componentWillMount() {
    // todo
  }

  public render() {
    return (
      <div className="header-container">
        <CityDoLogo />
        <User />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Header);

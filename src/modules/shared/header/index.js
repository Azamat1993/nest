import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '../containers/Button';

import { connect } from 'react-redux';
import { logout } from '../../auth/actions';

const Container = styled.div`
  height: 8rem;
  background-color: lightgrey;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0px 10px 43px -17px rgba(0,0,0,0.2);

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 3rem;
`

class Header extends PureComponent {
  onLogout = () => {
    this.props.logout();
  }

  render() {
    if (!this.props.auth.loggedIn) {
      return null;
    }
    return <Container>
      <Button onClick={this.onLogout}>Log out</Button>
    </Container>
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, {
  logout
})(Header);

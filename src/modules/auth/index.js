import React, {Component} from 'react';
import qs from 'query-string';
import {connect} from 'react-redux';
import AuthHOC from './HOC/AuthHOC';
import styled from 'styled-components';

import {login} from './actions';
import Button from '../shared/containers/Button';

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  padding-left: 3rem;
`;

class Auth extends Component {
    onLogin = () => {
        window.location.href = 'https://home.nest.com/login/oauth2?client_id=82e718d1-1c2c-4dba-9499-ba67eb3bcae5&state=STATE';
    }

    componentDidMount() {
        const parsed = qs.parse(window.location.search) || {};
        if (parsed.code) {
            this.props.login(parsed.code);
        }
    }

    render() {
        return (
            <Container>
                <Button onClick={this.onLogin}>
                    Sign in
                </Button>
            </Container>
        )
    }
}

export default AuthHOC({
    redirectUrl: '/devices',
    shouldRedirect: (loggedIn) => loggedIn
})(
    connect(null, {
        login
    })(Auth));

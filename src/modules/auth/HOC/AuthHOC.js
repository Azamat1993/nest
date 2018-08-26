import React, {Component} from 'react';

import {connect} from 'react-redux';

const OuterConfig = (config) => {
    return (ComposedComponent) => {
        class AuthHOC extends Component {
            componentDidMount() {
                this.shouldRedirect(this.props);
            }

            componentWillUpdate(newProps) {
                this.shouldRedirect(newProps);
            }

            shouldRedirect(props) {
                const {history, loggedIn} = props;
                if (config.shouldRedirect(loggedIn)) {
                    history.push(config.redirectUrl);
                }
            }

            render() {
                return <ComposedComponent {...this.props}/>
            }
        }

        const mapStateToProps = (state) => ({
            loggedIn: state.auth.loggedIn
        })

        return connect(mapStateToProps)(AuthHOC);
    }
}

export default OuterConfig;

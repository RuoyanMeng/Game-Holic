import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signIn } from '../../Actions/authActions'
import { Link } from "react-router-dom";

import '../../Styles/Sign.css'

class SignIn extends Component {

    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
    }

    goBack(e) {
        e.preventDefault();
        this.props.history.goBack();
    }

    render() {
        const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to='/' />
        let signUp = <Link to="/SignUp">Sign Up</Link>;

        return (
            <div className="container">

                <div class="Sign">
                    <button
                        className='mt3 ml3 f6 bg-transparent no-underline grow dib v-mid white ba b--white ph3 pv2 mb3'
                        onClick={e => { this.goBack(e) }}
                    >
                        Back
                    </button>
                    <form onSubmit={this.handleSubmit} className="white">
                        <div className="input-field mt3 white">
                            <label htmlFor="email" className="db fw6 lh-copy f6">Email<br /></label>
                            <input
                                className='pa2 b--white input-reset ba bg-transparent w-100'
                                type="email"
                                id="email"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="input-field mt3">
                            <label htmlFor="password" className="db fw6 lh-copy f6">Password<br /></label>
                            <input
                                className='pa2 b--white input-reset ba bg-transparent white w-100'
                                type="password"
                                id="password"
                                onChange={this.handleChange}
                            />
                        </div><br /><br />
                        <div className="mt0">
                            <button className="f6 bg-transparent no-underline grow dib v-mid white ba b--white ph3 pv2 mb3">
                                Sign In
                            </button>
                            <h5 className="white mt1">
                                Don't have an account? {signUp}
                            </h5>
                            <div className="center red">
                                {authError ? <p>{authError}</p> : null}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
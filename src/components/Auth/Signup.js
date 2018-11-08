import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { Error } from '../Error';

import { SIGNUP_USER } from "../../mutations";

const initialState = {
    fullName: "",
    email: "",
    password: ""
};

export class Signup extends Component {
    state = { ...initialState };

    clearState = () => {
        this.setState({ ...initialState });
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e, signup) => {
        e.preventDefault();
        signup().then((data) => {
            console.log(data);
            this.clearState();
        });
    }

    validateForm = () => {
        const { fullName, email, password } = this.state;
        return !fullName || !email || !password;
    }

    render() {
        const { fullName, email, password } = this.state;

        return (
            <div className="App">
                <h2 className="App">Signup</h2>
                <Mutation mutation={SIGNUP_USER} variables={{ fullName, email, password }}>
                    {( signup, { data, loading, error }) => {
                        return (
                            <form onSubmit={e => this.handleSubmit(e, signup)} className="form">
                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={fullName || ""}
                                    onChange={this.handleChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email || ""}
                                    onChange={this.handleChange}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password || ""}
                                    onChange={this.handleChange}
                                />
                                <button
                                    type="submit"
                                    className="button-primary"
                                    disabled={loading || this.validateForm() }
                                >
                                    Submit
                                </button>
                                {error && <Error error={error} />}
                            </form>
                        );
                    }}

                </Mutation>
            </div>
        );
    }
}

export default Signup;

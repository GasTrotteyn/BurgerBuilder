import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "E-mail",
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
                isSignUp: true,
            },
        },
    };

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    };

    inputChangedHandler = (event, inputIdentifier) => {
        //you need to clone the state in order to change it immutably, but you have to do that spread action for each level of nested in your state you have.
        let updatedControls = {
            ...this.state.controls,
        };
        let updatedControl = {
            ...updatedControls[inputIdentifier],
        };
        updatedControl.value = event.target.value;
        updatedControl.valid = this.checkValidity(updatedControl.value, updatedControl.validation);
        updatedControl.touched = true;
        updatedControls[inputIdentifier] = updatedControl;

        let formIsValid = true;
        for (let identifier in updatedControls) {
            formIsValid = updatedControls[identifier].valid && formIsValid;
        }

        this.setState({
            controls: updatedControls,
            valid: formIsValid,
        });
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    };

    switchAuthModehandler = () => {
        this.setState((prevState) => {
            return { isSignUp: !prevState.isSignUp };
        });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }
        const form = formElementsArray.map((formElement) => {
            return (
                <Input
                    key={formElement.id}
                    valueType={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    shouldValidate={formElement.config.validation}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                />
            );
        });

        let formDisplay = (
            <div className={classes.Auth}>
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button disabled={!this.state.valid} btnType="Success">
                        SUBMIT
                    </Button>
                    <Button btnType="Danger" clicked={this.switchAuthModehandler}>
                        SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
                    </Button>
                </form>
            </div>
        );

        if (this.props.loading) {
            formDisplay = <Spinner></Spinner>;
        }
        let message = null;

        if (this.props.error) {
            message = <p>algo salió shremal!{this.props.error.message}</p>;
        }

        return (
            <div>
                {message}
                {formDisplay}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

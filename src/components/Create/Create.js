import React, {Component} from 'react'
import Input from '../UI/Input/Input'
import Button from '@material-ui/core/Button'

import style from './Create.module.scss'
import {connect} from 'react-redux'
import {closeSuccessMessage, submitContact} from '../../redux/action/create'
import SuccessMessage from '../SuccessMessage/SuccessMessage'

class Create extends Component {
    stateDefault = {
        formControls: {
            name: {
                value: '',
                type: 'text',
                label: 'Name',
                error: false,
                require: true,
                helperText: 'Value cannot be empty',
                mask: '',
                placeholder: '',
                touched: false
            },
            phone: {
                value: '',
                type: 'phone',
                label: 'Phone',
                error: false,
                require: true,
                helperText: 'Enter correct phone number',
                mask: '+3\\8 999 999 99 99',
                placeholder: '',
                touched: false
            },
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                require: false,
                error: false,
                helperText: 'Value cannot be empty',
                mask: '',
                placeholder: 'example@domain.com',
            },
            comment: {
                value: '',
                type: 'text',
                label: 'Comment',
                require: false,
                error: false,
                helperText: 'Value cannot be empty',
                mask: '',
                placeholder: '',
            },
        },
        isValid: false,
    }
    state = {...this.stateDefault};

    changeHandler = (value, inputName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[inputName]}

        control.touched = true
        control.value = value
        control.error = control.require ? control.value.trim() === '' : false

        if (inputName === 'phone') {
            control.error = value.length < 17
        }

        formControls[inputName] = control

        // touch two fields - [true]
        const isTouched = !Object.values(formControls).filter(field => field.require).map(field => field.touched).includes(false)

        // no errors - [true]
        const isErrors = !Object.values(formControls).filter(field => field.require).map(field => field.error).includes(true)

        this.setState({
            formControls,
            isValid: isTouched && isErrors
        })
    }

    submitContactForm(event) {
        event.preventDefault()
        const {name, phone, email, comment} = this.state.formControls

        const commentItem = {
            name: name.value,
            phone: phone.value,
            email: email.value,
            comment: comment.value
        }

        this.props.submitContact(commentItem)

        this.setState({
            formControls: this.stateDefault.formControls,
            isValid: this.stateDefault.isValid
        })
    }

    renderInput() {
        return Object.keys(this.state.formControls).map((inputName, index) => {
            const inputs = this.state.formControls[inputName]
            return (
                <Input
                    key={inputName + index}
                    value={inputs.value}
                    type={inputs.type}
                    label={inputs.label}
                    required={inputs.require}
                    error={inputs.error}
                    helperText={inputs.helperText}
                    multiline={inputs.multiline}
                    mask={inputs.mask}
                    placeholder={inputs.placeholder}
                    onChange={event => this.changeHandler(event.target.value, inputName)}
                />

            )
        })
    }

    render() {
        return (

            <div className={style.Create}>
                <h1>Create contact</h1>

                <form className={style.Form}>
                    {this.renderInput()}
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        disabled={!this.state.isValid}
                        onClick={event => this.submitContactForm(event)}
                    >Submit</Button>
                </form>

                <SuccessMessage handleClose={this.props.closeSuccessMessage} alertOpen={this.props.isFinished}/>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        isFinished: state.create.isFinished
    }
}

function mapDispatchToProps(dispatch) {
    return {
        submitContact: contact => dispatch(submitContact(contact)),
        closeSuccessMessage: () => dispatch(closeSuccessMessage()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create)

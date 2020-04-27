import React, {Component} from 'react'

import style from './Form.module.scss'

import Button from '@material-ui/core/Button'
import Input from '../UI/Input/Input'
import {closeSuccessMessage, submitContact} from '../../redux/action/create'
import SuccessMessage from '../SuccessMessage/SuccessMessage'
import {connect} from 'react-redux'
import {cancelEditHandler, saveEditHandler} from '../../redux/action/contact'

class Form extends Component {
    constructor(prop) {
        super(prop);

        this.isFirstInit = false
    }

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

        formControls[inputName] = control

        const isTouched = !Object.values(formControls).filter(field => field.require).map(field => field.touched).includes(false)
        const isErrors = !Object.values(formControls).filter(field => field.require).map(field => field.error).includes(true)

        this.setState({
            formControls,
            isValid: isTouched && isErrors
        })
    }

    onBlur = (value, inputName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[inputName]}

        control.error = control.require ? control.value.trim() === '' : false

        if (inputName === 'phone') {
            control.error = value.length < 17
        }

        formControls[inputName] = control

        this.setState({
            formControls,
        })
    }

    submitContactForm(event, isSaved) {
        event.preventDefault()
        const {name, phone, email, comment} = this.state.formControls

        const commentItem = {
            name: name.value,
            phone: phone.value,
            email: email.value,
            comment: comment.value
        }

        if (!isSaved) {
            this.props.submitContact(commentItem)
            this.setState({
                formControls: this.stateDefault.formControls,
                isValid: this.stateDefault.isValid
            })
        } else {
            this.props.saveEditHandler(commentItem, this.props.idContact)
        }
    }

    initFields() {
        if (!this.isFirstInit && !!this.props.idContact) {

            const formControls = {...this.state.formControls}

            Object.entries(this.props.contactItem).forEach(item => {
                let [key, value] = item
                formControls[key].value = value
            })

            this.setState({
                formControls
            })
            this.isFirstInit = true
        }
    }

    componentDidMount() {
        this.initFields()
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
                    disabled={!!this.props.idContact && !this.props.changeEdit}
                    error={inputs.error}
                    helperText={inputs.helperText}
                    multiline={inputs.multiline}
                    mask={inputs.mask}
                    onBlur={event => this.onBlur(event.target.value, inputName)}
                    placeholder={inputs.placeholder}
                    onChange={event => this.changeHandler(event.target.value, inputName)}
                />
            )
        })
    }

    render() {
        return (
            <form className={style.Form}>

                {this.renderInput()}

                {
                    this.props.changeEdit
                        ? (
                            <div className={style.ButtonWrap}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={event => this.submitContactForm(event, true)}
                                >Save
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={this.props.cancelEditHandler}
                                >Cancel
                                </Button>
                            </div>
                        )
                        : !this.props.idContact
                        ? (
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                disabled={!this.state.isValid}
                                onClick={event => this.submitContactForm(event, false)}
                            >Submit</Button>
                        )
                        : null
                }


                <SuccessMessage handleClose={this.props.closeSuccessMessage} alertOpen={this.props.isFinished}/>
            </form>

        );
    }
}

function mapStateToProps(state) {
    return {
        isFinished: state.create.isFinished,
        loading: state.contact.loading,
        contactItem: state.contact.contactItem,
        idContact: state.contact.id,
        changeEdit: state.contact.changeEdit,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        submitContact: contact => dispatch(submitContact(contact)),
        closeSuccessMessage: () => dispatch(closeSuccessMessage()),
        saveEditHandler: (contact, id) => dispatch(saveEditHandler(contact, id)),
        cancelEditHandler: () => dispatch(cancelEditHandler()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Form)
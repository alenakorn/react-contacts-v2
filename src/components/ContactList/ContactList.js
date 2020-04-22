import React, {Component} from 'react'
import style from './ContactList.module.scss'

import ContactItem from '../ContactItem/ContactItem'
import Loader from '../UI/Loader/Loader'
import ViewContact from '../ViewContact/ViewContact'

import ModalWrap from '../UI/Modal/Modal'
import {connect} from 'react-redux'
import {fetchContacts} from '../../redux/action/list'
import {openContact} from '../../redux/action/contact'

class ContactList extends Component {

    componentDidMount() {
        this.props.fetchContacts()
    }

    renderContactItem() {
        return this.props.contacts.map((item, key) => {
            return (
                <ContactItem
                    key={key}
                    comment={item.comment}
                    email={item.email}
                    name={item.name}
                    phone={item.phone}
                    onClick={() => this.props.openContact(item.id)}
                />
            )
        })
    }

    handleOpen = () => {

    }

    handleClose = () => {

    }

    render() {

        return (
            <>
                {
                    this.props.loading
                        ? <Loader/>
                        : (
                            <div className={style.ListContainer}>
                                <div className={style.ListTitle}>
                                    <div>Name</div>
                                    <div>Phone</div>
                                    <div>Email</div>
                                    <div>Comment</div>
                                </div>
                                {this.renderContactItem()}

                                <ModalWrap
                                    open={this.props.openModal}
                                    // handleOpen={this.handleOpen}
                                    // handleClose={this.handleClose}
                                >
                                    <ViewContact/>
                                </ModalWrap>
                            </div>
                        )
                }
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        contacts: state.list.contacts,
        loading: state.list.loading,
        openModal: state.contact.openModal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchContacts: () => dispatch(fetchContacts()),
        openContact: id => dispatch(openContact(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList)
import React, {Component} from 'react'
import style from './ContactList.module.scss'

import ContactItem from '../ContactItem/ContactItem'
import Loader from '../UI/Loader/Loader'
import ViewContact from '../ViewContact/ViewContact'

import ModalWrap from '../UI/Modal/Modal'
import {connect} from 'react-redux'
import {fetchContacts} from '../../redux/action/list'
import {closeModalHandler, openContact, openModalHandler} from '../../redux/action/contact'
import EmptyList from '../EmptyList/EmptyList'

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

    render() {
        return (
            <>
                {
                    this.props.loading
                        ? <Loader/>
                        :
                        this.props.isEmptyList
                            ? <EmptyList />
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
                                        handleOpen={this.props.openModalHandler}
                                        handleClose={this.props.closeModalHandler}
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
        isEmptyList: state.list.isEmptyList,
        contacts: state.list.contacts,
        loading: state.list.loading,
        openModal: state.contact.openModal,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchContacts: () => dispatch(fetchContacts()),
        openContact: id => dispatch(openContact(id)),
        openModalHandler: () => dispatch(openModalHandler()),
        closeModalHandler: () => dispatch(closeModalHandler()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactList)
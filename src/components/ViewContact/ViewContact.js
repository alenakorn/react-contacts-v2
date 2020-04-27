import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from '../UI/Loader/Loader'

import style from './ViewContact.module.scss'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import {changeEditHandler, deleteContact, openConfirmDialog, closeConfirmDialog} from '../../redux/action/contact'
import Form from '../Form/Form'
import ConfirmDialog from '../UI/Dialog/Dialog'

class ViewContact extends Component {

    render() {
        return (
            <>
                {
                    this.props.loading
                        ? <Loader/>
                        : (
                            <div>
                                <div className={style.controlsWrap}>
                                    <div className={style.title}><h2>Contact information</h2></div>
                                    <div className={style.controls}>
                                        <div onClick={this.props.changeEditHandler}><EditIcon/></div>
                                        <div onClick={this.props.openConfirmDialog}><DeleteIcon/></div>
                                    </div>
                                </div>

                                <Form />

                                <ConfirmDialog
                                    title="Are you sure you want to delete this item?"
                                    handleClose={this.props.closeConfirmDialog}
                                    handleDelete={() => this.props.deleteContact(this.props.idContact)}
                                    open={this.props.openDialog}
                                />

                            </div>
                        )
                }
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        loading: state.contact.loading,
        idContact: state.contact.id,
        openDialog: state.contact.openDialog,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteContact: id => dispatch(deleteContact(id)),
        changeEditHandler: () => dispatch(changeEditHandler()),
        openConfirmDialog: () => dispatch(openConfirmDialog()),
        closeConfirmDialog: () => dispatch(closeConfirmDialog()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewContact)
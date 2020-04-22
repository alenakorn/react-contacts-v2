import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from '../UI/Loader/Loader'
import Input from '../UI/Input/Input'

import style from './ViewContact.module.scss'

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'

import {deleteContact} from '../../redux/action/contact'

class ViewContact extends Component {

    state = {
        changeEdit: false,
        changeDelete: false,
    }

    changeEditHandler = () => {
        this.setState({
            changeEdit: true
        })
    }

    render() {
        const contactItem = this.props.contactItem
        console.log(this.props.idContact)
        return (
            <>
                {
                    this.props.loading
                        ? <Loader/>
                        : (
                            <div>
                                <div className={style.controlsWrap}>
                                    <div className={style.title}><h2>Title contact</h2></div>
                                    <div className={style.controls}>
                                        <div onClick={this.changeEditHandler}><EditIcon/></div>
                                        <div onClick={() => this.props.deleteContact(this.props.idContact)}><DeleteIcon/></div>
                                    </div>
                                </div>
                                {
                                    Object.entries(contactItem).map((item, key) => {
                                        return (
                                              <Input
                                                  key={key}
                                                  value={!!item[1] ? item[1] : ' '}
                                                  label={item[0]}
                                                  disabled={!this.state.changeEdit}
                                                  placeholder=''
                                              />
                                        )
                                    })
                                }

                                {
                                    this.state.changeEdit
                                        ?  (
                                            <>
                                                <Button variant="contained" color="primary">
                                                Save
                                            </Button>
                                                <Button variant="outlined" color="primary">
                                                    Cancel
                                                </Button>
                                            </>
                                        )
                                        : null
                                }
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
        contactItem: state.contact.contactItem,
        idContact: state.contact.id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        deleteContact: id => dispatch(deleteContact(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewContact)
import React from 'react'
import {NavLink} from 'react-router-dom'
import style from './CreateButton.module.scss'
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd'

const CreateButton = () => {
    return (
        <>
            <NavLink to='/create' className={style.CreateButton} activeClassName={style.activeCreateLink}>
                <ListItem button>
                    <ListItemIcon><PersonAddIcon/></ListItemIcon>
                    <ListItemText>Create contact</ListItemText>
                </ListItem>
            </NavLink>
        </>
    )
}

export default CreateButton
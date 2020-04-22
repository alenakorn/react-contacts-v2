import React from 'react'
import style from './ContactItem.module.scss'

const ContactItem = props => {
    return (
        <div onClick={props.onClick} className={style.ContactItem}>
            <div className={style.Name}>{props.name}</div>
            <div className={style.Phone}>{props.phone}</div>
            <div className={style.Email}>{props.email}</div>
            <div className={style.Comment}>{props.comment}</div>
        </div>
    )
}

export default ContactItem
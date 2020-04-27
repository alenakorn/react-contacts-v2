import React, {Component} from 'react'
import style from './EmptyList.module.scss'
import CreateButton from '../UI/CreateButton/CreateButton'

class EmptyList extends Component {
    render() {
        return (
            <div className={style.EmptyList}>
                <h2>Your contact list is currently empty</h2>
                <div className={style.CreateButtonWrap}>
                    <CreateButton/>
                </div>
            </div>
        );
    }
}

export default EmptyList
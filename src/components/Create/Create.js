import React, {Component} from 'react'
import style from './Create.module.scss'
import Form from '../Form/Form'

class Create extends Component {
    render() {
        return (
            <div className={style.Create}>
                <h1>Create contact</h1>
                <div className={style.FormWrap}>
                    <Form/>
                </div>
            </div>

        );
    }
}

export default Create

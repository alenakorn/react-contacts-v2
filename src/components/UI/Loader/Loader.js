import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import style from './Loader.module.scss'

const Loader = () => (
    <div className={style.Loader}>
        <CircularProgress/>
    </div>
)

export default Loader
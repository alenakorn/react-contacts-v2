import React from 'react'
import TextField from '@material-ui/core/TextField'
import InputMask from 'react-input-mask';
import style from './Input.module.scss'


const TextMaskCustom = (props) => {
    return (
        <InputMask  {...props} mask={props.name} maskChar={null} placeholder={props.placeholder}/>
    );
}

const Input = props => {
    return (
        <div className={style.Input}>
            <TextField
                className={style.InputItem}
                label={props.label}
                value={props.value}
                variant="outlined"
                required={props.required}
                error={props.error}
                helperText={props.error ? props.helperText : null}
                disabled={props.disabled || false}
                multiline={props.multiline || true}
                onChange={props.onChange}
                InputProps={{
                    placeholder: props.placeholder,
                    name: props.mask,
                    inputComponent: TextMaskCustom,
                }}
            />
        </div>
    );
}

export default Input;

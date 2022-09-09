import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const CssTextField = styled(TextField)({

    '& .MuiInputLabel-root': {
        fontSize: '0.9rem',
        color: '#666',
        '& .required': {
            color: '#f00',
            paddingLeft: '2px',
            fontSize: '16px',
        },
    },
    '& label.Mui-focused': {
        color: '#666',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {

        height: '40px',
        fontSize: '13px',
        fontWeight: '600',

        '& fieldset': {
            borderColor: '#a6a8ab',
        },
        '&:hover fieldset': {
            borderColor: '#a6a8ab',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#0085FE',
        },
    },
});


function TextBox(props) {

    const { label = "", value = '', handleOnChange = null, disabled = false, name, isCompulsory = false, calIcon = false } = props;

    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        if (value !== inputValue) {
            setInputValue(value);
        }
    }, [value])

    const handleInputOnChange = (e) => {
        let newVal = e.target.value;
        // console.log(newVal);
        setInputValue(newVal);
        if (handleOnChange) {
            handleOnChange(e, newVal)
        }
    }

    const labelTxt =
        isCompulsory ? (
            <span>
                {label}
                <span style={{ color: "red", paddingLeft: "5px" }}>*</span>
            </span>
        ) : (
            label
        );

    const clearInput = (e) => {
        setInputValue('');
        if (handleOnChange) {
            handleOnChange(e)
        }
    }

    return (
        <CssTextField
            fullWidth
            name={name}
            id={name}
            label={labelTxt}
            disabled={disabled}
            value={inputValue}
            onChange={handleInputOnChange}
            size="small"
            InputProps={{
                autoComplete: "off",
                startAdornment: (calIcon ? <InputAdornment position="start">
                    <FontAwesomeIcon
                        icon={faCalendarDays}
                        className="cross"
                        style={{ fontSize: "18px" }}
                        color={"#0085fe"} /></InputAdornment> : null
                ),
                endAdornment: (disabled ? null : <InputAdornment position="end">
                    {inputValue.length > 0 && <div className="cross--icon"><FontAwesomeIcon icon={faXmark} className="cross" onClick={clearInput} /> </div>}
                </InputAdornment>)

            }}
        />
    )
}

export default TextBox;

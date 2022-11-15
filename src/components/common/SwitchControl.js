import React from 'react'
import { Switch } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase': {
        '&.Mui-checked': {
            color: '#0086ff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#0086ff',
            },
        }
    },
}));

function SwitchControl({ label, setCheck, handelOnChange,labelPlacement="top" }) {

    const [checked, setChecked] = React.useState(setCheck);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        handelOnChange(event.target.checked);
    };

    return (
        <FormControlLabel
            control={<MaterialUISwitch checked={checked} onChange={handleChange} inputProps={{ 'aria-label': 'controlled' }} />}
            label={label}
            labelPlacement={labelPlacement}
        />
    )
}

export default SwitchControl;

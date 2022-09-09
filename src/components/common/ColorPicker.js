import React, { useState } from 'react'
import { PhotoshopPicker } from 'react-color'

function ColorPicker({ color, onAcceptPicker, onCancelPicker }) {

    const [colorPicker, setColorPicker] = useState(color);

    const handelColorPickerComplete = (color) => {
        setColorPicker(color.hex);
    }

    const handelColorPickerAccept = () => {
        onAcceptPicker(colorPicker);
    }

    const handelColorPickerCancel = () => {
        onCancelPicker();
    }

    return (
        <PhotoshopPicker
            color={colorPicker}
            onChange={handelColorPickerComplete}
            onChangeComplete={handelColorPickerComplete}
            onAccept={handelColorPickerAccept}
            onCancel={handelColorPickerCancel} />
    )
}

export default ColorPicker

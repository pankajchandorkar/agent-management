import { useState, useEffect, forwardRef } from "react";
import MultiSelectDropDown from "../form-components/MultiSelectDropDownComponent";
//import MultiSelectDropDownForm from "../form-components/MultiSelectDropDownFormComponent";

const FareChangeTypeAutocomplete = forwardRef((props, ref) => {

    const { allOption, selectedValues = [], isFormikFormField = false, showFormError = false, disabled, ...rest } = props;

    const acOptions = [
        { value: 'Percentage', id: 1 },
        { value: 'Fixed', id: 2 },
    ]

    if (allOption) {
        acOptions.unshift({ value: 'All', id: -1 })
    }

    let initialProps = {
        ...rest,
        labelKey: 'value',
        primaryKey: 'id',
        options: acOptions,
        isObject: true,
        isFormikFormField,
        showFormError,
        dataLoaded: selectedValues.length > 0 ? false : true
    }
    const [defaultProps, setDefaultProps] = useState(initialProps);

    useEffect(() => {
        if (selectedValues.length > 0) {
            let preSelectedValues = [];
            if (selectedValues.length > 0) {
                preSelectedValues = acOptions.filter((s) => selectedValues.indexOf(s.id) >= 0);
                const newProps = { ...defaultProps, preSelectedValues, dataLoaded: true }
                setDefaultProps(newProps);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValues]);

    useEffect(() => {
        setDefaultProps({ ...defaultProps, disabled: disabled, dataLoaded: false });
        setTimeout(() => {
            setDefaultProps({ ...defaultProps, disabled: disabled, dataLoaded: true });
        }, 0);
    }, [disabled]);

    return (defaultProps.dataLoaded ?
        !isFormikFormField ?
            <MultiSelectDropDown
                ref={ref}
                {...defaultProps}
            /> :
            {/* <MultiSelectDropDownForm
            ref={ref}
            {...defaultProps}
        /> */} : <></>
    );
});

export default FareChangeTypeAutocomplete;
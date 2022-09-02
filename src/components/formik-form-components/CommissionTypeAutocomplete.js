import { useState, useEffect, forwardRef } from "react";
import MultiSelectDropDown from "../form-components/MultiSelectDropDownComponent";
//import MultiSelectDropDownForm from "../form-components/MultiSelectDropDownFormComponent";

const CommissionTypeAutocomplete = forwardRef((props, ref) => {
    const { allOption, selectedValues = [], isFormikFormField = false, showFormError = false, ...rest } = props;
    const commTypeOptions = [
        { commType: 'Fixed % or amount', commTypeId: 1 },
        { commType: 'Routewise', commTypeId: 2 },
        { commType: 'Jackup %', commTypeId: 3 },
    ]
    if (allOption) {
        commTypeOptions.unshift({ commType: 'All', commTypeId: -1 })
    }
    let initialProps = {
        ...rest,
        labelKey: 'commType',
        primaryKey: 'commTypeId',
        options: commTypeOptions,
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
                preSelectedValues = commTypeOptions.filter((s) => selectedValues.indexOf(s.commTypeId) >= 0);
                const newProps = { ...defaultProps, preSelectedValues, dataLoaded: true }
                setDefaultProps(newProps);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedValues]);

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

export default CommissionTypeAutocomplete;
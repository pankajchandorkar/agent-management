import React, { useState, useEffect, forwardRef } from "react";
import MultiSelectDropDown from "../form-components/MultiSelectDropDownComponent";
//import MultiSelectDropDownForm from "../form-components/MultiSelectDropDownFormComponent";

const DivisionAutocomplete = forwardRef((props, ref) => {

    const { allOption, selectedValues = [], isFormikFormField = false, showFormError = false, ...rest } = props;

    const divisionOptions = [
        { division: 'Division 1', divisionId: 1 },
        { division: 'Division 2', divisionId: 2 },
        { division: 'Division 3', divisionId: 3 },
    ]

    if (allOption) {
        divisionOptions.unshift({ division: 'All', divisionId: -1 })
    }

    let initialProps = {
        ...rest,
        labelKey: 'division',
        primaryKey: 'divisionId',
        options: divisionOptions,
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
                preSelectedValues = divisionOptions.filter((s) => selectedValues.indexOf(s.divisionId) >= 0);
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
        /> */} : <React.Fragment></React.Fragment>
    );
});

export default DivisionAutocomplete;
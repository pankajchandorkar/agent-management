import { useState, useEffect, forwardRef } from "react";
import MultiSelectDropDown from "../form-components/MultiSelectDropDownComponent";
//import MultiSelectDropDownForm from "../form-components/MultiSelectDropDownFormComponent";

const StatusAutocomplete = forwardRef((props,ref) => {
    const {allOption, selectedValues=[], isFormikFormField = false, showFormError = false, ...rest} = props;
    const statusOptions = [{label:'Active',id:1},{label:'Inactive',id:0}]
    if(allOption){
        statusOptions.unshift({label:'All', id:-1})
    }
    let initialProps = {
        ...rest,
        labelKey:'label',
        primaryKey:'id',
        options:statusOptions,
        isObject:true,
        isFormikFormField,
        showFormError,
        dataLoaded: selectedValues.length > 0 ? false : true
    }
    const [defaultProps, setDefaultProps] = useState(initialProps);

    useEffect(() => {
        if(selectedValues.length > 0){
            let preSelectedValues = [];
            if(selectedValues.length > 0){
                preSelectedValues =  statusOptions.filter((s) => selectedValues.indexOf(s.id) >= 0);
                const newProps = {...defaultProps, preSelectedValues, dataLoaded:true}
                setDefaultProps(newProps);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectedValues]);

    return ( defaultProps.dataLoaded ? 
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

export default StatusAutocomplete;
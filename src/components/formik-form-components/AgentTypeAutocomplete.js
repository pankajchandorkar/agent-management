import { useState, useEffect, forwardRef } from "react";
import MultiSelectDropDown from "../form-components/MultiSelectDropDownComponent";
//import MultiSelectDropDownForm from "../form-components/MultiSelectDropDownFormComponent";

const AgentTypeAutocomplete = forwardRef((props, ref) => {
    const { allOption, selectedValues = [], isFormikFormField = false, showFormError = false, ...rest } = props;
    const agentTypeOptions = [
        { agentType: 'Personal', agentTypeId: 1 },
        { agentType: 'Corporate', agentTypeId: 2 },
    ]
    if (allOption) {
        agentTypeOptions.unshift({ agentType: 'All', agentTypeId: -1 })
    }
    let initialProps = {
        ...rest,
        labelKey: 'agentType',
        primaryKey: 'agentTypeId',
        options: agentTypeOptions,
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
                preSelectedValues = agentTypeOptions.filter((s) => selectedValues.indexOf(s.agentTypeId) >= 0);
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

export default AgentTypeAutocomplete;
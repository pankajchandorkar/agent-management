import { useState, useEffect, forwardRef } from "react";
import MultiSelectDropDown from "../form-components/MultiSelectDropDownComponent";
//import MultiSelectDropDownForm from "../form-components/MultiSelectDropDownFormComponent";

const AgentNameAutocomplete = forwardRef((props, ref) => {
    const { allOption, selectedValues = [], isFormikFormField = false, showFormError = false, ...rest } = props;
    const agentNameOptions = [
        { agentName: 'Amit Kumar Singh', agentId: 1 },
        { agentName: 'Nisar E', agentId: 2 },
        { agentName: 'Krishna Pandey', agentId: 3 },
        { agentName: 'Sarvesh Verma', agentId: 4 },
        { agentName: 'Shaziya Praveen', agentId: 5 },
        { agentName: 'Sachin Jhadav', agentId: 6 },
        { agentName: 'Vidushi Tiwari', agentId: 7 },
        { agentName: 'Pankaj Chandorkar', agentId: 8 },
        { agentName: 'Saidesh Dandu', agentId: 9 },
    ]
    if (allOption) {
        agentNameOptions.unshift({ agentName: 'All', agentId: -1 })
    }
    let initialProps = {
        ...rest,
        labelKey: 'agentName',
        primaryKey: 'agentId',
        options: agentNameOptions,
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
                preSelectedValues = agentNameOptions.filter((s) => selectedValues.indexOf(s.agentId) >= 0);
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

export default AgentNameAutocomplete;
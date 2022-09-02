import { useState, useEffect, forwardRef } from "react";
import MultiSelectDropDown from "../form-components/MultiSelectDropDownComponent";
//import MultiSelectDropDownForm from "../form-components/MultiSelectDropDownFormComponent";

const AgentEmailAutocomplete = forwardRef((props, ref) => {
    const { allOption, selectedValues = [], isFormikFormField = false, showFormError = false, ...rest } = props;
    const agentEmailOptions = [
        { agentEmail: 'amit.singh@maventechlabs.com', agentId: 1 },
        { agentEmail: 'nisar.ellakandi@maventechlabs.com', agentId: 2 },
        { agentEmail: 'krishna.pandey@maventechlabs.com', agentId: 3 },
        { agentEmail: 'sarvesh.verma@maventechlabs.com', agentId: 4 },
        { agentEmail: 'shaziya.praveen@maventechlabs.com', agentId: 5 },
        { agentEmail: 'sachin.jhadav@maventechlabs.com', agentId: 6 },
        { agentEmail: 'vidushi.tiwari@maventechlabs.com', agentId: 7 },
        { agentEmail: 'pankaj.chandorkar@maventechlabs.com', agentId: 8 },
        { agentEmail: 'saideswara.dandu@maventechlabs.com', agentId: 9 },
    ]
    if (allOption) {
        agentEmailOptions.unshift({ agentEmail: 'All', agentId: -1 })
    }
    let initialProps = {
        ...rest,
        labelKey: 'agentEmail',
        primaryKey: 'agentId',
        options: agentEmailOptions,
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
                preSelectedValues = agentEmailOptions.filter((s) => selectedValues.indexOf(s.agentId) >= 0);
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

export default AgentEmailAutocomplete;
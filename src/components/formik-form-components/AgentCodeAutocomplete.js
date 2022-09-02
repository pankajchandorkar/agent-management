import { useState, useEffect, forwardRef } from "react";
import MultiSelectDropDown from "../form-components/MultiSelectDropDownComponent";
//import MultiSelectDropDownForm from "../form-components/MultiSelectDropDownFormComponent";

const AgentCodeAutocomplete = forwardRef((props, ref) => {
    const { allOption, selectedValues = [], isFormikFormField = false, showFormError = false, ...rest } = props;
    const agentCodeOptions = [
        { agentCode: '100001', agentId: 1 },
        { agentCode: '100002', agentId: 2 },
        { agentCode: '100003', agentId: 3 },
        { agentCode: '100004', agentId: 4 },
        { agentCode: '100005', agentId: 5 },
        { agentCode: '100006', agentId: 6 },
        { agentCode: '100007', agentId: 7 },
        { agentCode: '100008', agentId: 8 },
        { agentCode: '100009', agentId: 9 },
    ]
    if (allOption) {
        agentCodeOptions.unshift({ agentCode: 'All', agentId: -1 })
    }
    let initialProps = {
        ...rest,
        labelKey: 'agentCode',
        primaryKey: 'agentId',
        options: agentCodeOptions,
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
                preSelectedValues = agentCodeOptions.filter((s) => selectedValues.indexOf(s.agentId) >= 0);
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

export default AgentCodeAutocomplete;
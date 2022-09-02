import { useState, useEffect, forwardRef } from "react";
import MultiSelectDropDown from "../form-components/MultiSelectDropDownComponent";
//import MultiSelectDropDownForm from "../form-components/MultiSelectDropDownFormComponent";

const AgentMobileAutocomplete = forwardRef((props, ref) => {
    const { allOption, selectedValues = [], isFormikFormField = false, showFormError = false, ...rest } = props;
    const agentMobileOptions = [
        { agentMobile: '9080706050', agentId: 1 },
        { agentMobile: '9080706051', agentId: 2 },
        { agentMobile: '9080706052', agentId: 3 },
        { agentMobile: '9080706053', agentId: 4 },
        { agentMobile: '9080706054', agentId: 5 },
        { agentMobile: '9080706055', agentId: 6 },
        { agentMobile: '9080706056', agentId: 7 },
        { agentMobile: '9080706057', agentId: 8 },
        { agentMobile: '9080706058', agentId: 9 },
    ]
    if (allOption) {
        agentMobileOptions.unshift({ agentMobile: 'All', agentId: -1 })
    }
    let initialProps = {
        ...rest,
        labelKey: 'agentMobile',
        primaryKey: 'agentId',
        options: agentMobileOptions,
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
                preSelectedValues = agentMobileOptions.filter((s) => selectedValues.indexOf(s.agentId) >= 0);
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

export default AgentMobileAutocomplete;
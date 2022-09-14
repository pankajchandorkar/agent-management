import { useEffect, useState, forwardRef } from "react";
import { useSelector } from 'react-redux';
import MultiSelectDropDown from "../form-components/MultiSelectDropDownComponent";
//import MultiSelectDropDownForm from "../form-components/MultiSelectDropDownFormComponent";
import api from '../../api/api';

const AreaAutocomplete = forwardRef((props, ref) => {

    const { allOption = false, selectedValues = [],  isFormikFormField = false, showFormError = false, ...rest } = props;
    let areaOptions = [];
    if (allOption) {
        areaOptions.unshift({ area: 'All', areaId: -1 })
    }

    let initialProps = {
        ...rest,
        labelKey: 'area',
        primaryKey: 'areaId',
        options: areaOptions,
        isObject: true,
        isFormikFormField,
        showFormError,
        dataLoaded: selectedValues.length > 0 ? false : true
    }
    const [defaultProps, setDefaultProps] = useState(initialProps);
    // Get Options

    useEffect(() => {

        const getAreaOptions = async () => {

            const getAreaParams = {  };

            const response = await api.get("/areas", {
                params: getAreaParams
            });

            if (response.data) {

                let newOptions = [];
                if (allOption) {
                    newOptions.push({ area: 'All Area', areaId: 0 });
                }

                if (response.data.length > 0) {
                    newOptions = newOptions.concat(response.data);
                }

                let preSelectedValues = [];
                if (selectedValues.length > 0) {
                    preSelectedValues = newOptions.filter((a) => selectedValues.indexOf(a.areaId) >= 0);
                }

                const newProps = { ...defaultProps, options: newOptions, preSelectedValues, dataLoaded: true }

                setDefaultProps(newProps);
            }
        }

        //if (stateId && stateId > 0) {
            getAreaOptions();
       /*  } else {
            const newProps = { ...defaultProps, options: cityOptions, dataLoaded: true }
            setDefaultProps(newProps);
        } */

    }, []);

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

export default AreaAutocomplete;
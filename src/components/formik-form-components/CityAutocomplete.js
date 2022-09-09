import { useEffect, useState, forwardRef } from "react";
import { useSelector } from 'react-redux';
import MultiSelectDropDown from "../form-components/MultiSelectDropDownComponent";
//import MultiSelectDropDownForm from "../form-components/MultiSelectDropDownFormComponent";
import api from '../../api/api';

const CityAutocomplete = forwardRef((props, ref) => {

    const { allOption = false, selectedValues = [], stateId = undefined, isFormikFormField = false, showFormError = false, ...rest } = props;
    let cityOptions = [];
    if (allOption) {
        cityOptions.push({ cityName: 'All Cities', cityId: 0 });
    }

    let initialProps = {
        ...rest,
        labelKey: 'cityName',
        primaryKey: 'cityId',
        options: cityOptions,
        isObject: true,
        isFormikFormField,
        showFormError,
        dataLoaded: false
    }
    const [defaultProps, setDefaultProps] = useState(initialProps);
    // Get Options

    useEffect(() => {

        const getCitiesOptions = async () => {

            const getCityParams = { stateId };

            const response = await api.get("/cities", {
                params: getCityParams
            });

            if (response.data) {

                let newOptions = [];
                if (allOption) {
                    newOptions.push({ cityName: 'All Cities', cityId: 0 });
                }

                if (response.data.length > 0) {
                    newOptions = newOptions.concat(response.data);
                }

                let preSelectedValues = [];
                if (selectedValues.length > 0) {
                    preSelectedValues = newOptions.filter((c) => selectedValues.indexOf(c.cityId) >= 0);
                }

                const newProps = { ...defaultProps, options: newOptions, preSelectedValues, dataLoaded: true }

                setDefaultProps(newProps);
            }
        }

        //if (stateId && stateId > 0) {
            getCitiesOptions();
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

export default CityAutocomplete;
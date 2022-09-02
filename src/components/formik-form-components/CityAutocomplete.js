import { useEffect, useState, forwardRef } from "react";
import { useSelector } from 'react-redux';
import MultiSelectDropDown from "../form-components/MultiSelectDropDownComponent";
//import MultiSelectDropDownForm from "../form-components/MultiSelectDropDownFormComponent";
//import { fetchApi } from '../../services/apiService'

const CityAutocomplete = forwardRef((props, ref) => {
    const { allOption = false, selectedValues = [], stateId = undefined, isFormikFormField = false, showFormError = false, ...rest } = props;
    let cityOptions = [];
    if (allOption) {
        cityOptions.push({ cityName: 'All Cities', cityId: 0 });
    }

    cityOptions.push(
        { cityName: 'Hyderabad', cityId: 1 },
        { cityName: 'Ahmedabad', cityId: 2 },
        { cityName: 'Delhi', cityId: 3 },
        { cityName: 'Mumbai', cityId: 4 },
        { cityName: 'Bengaluru', cityId: 5 },
        { cityName: 'Chennai', cityId: 6 },
        { cityName: 'Kolkata', cityId: 7 },
        { cityName: 'Lucknow', cityId: 8 },
        { cityName: 'Jaipur', cityId: 9 },
        { cityName: 'Raipur', cityId: 10 }
    );

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
    //const userToken = useSelector((state) => state.login.userToken);
    useEffect(() => {
        {/* const getCitiesOptions = async () => {
            const getCityParams = { stateId };
            const response = await fetchApi('masters/getCities', getCityParams, userToken);
            if (response.status === 'Ok' && response.data.responseStatus === 'Ok') {
                let newOptions = [];
                if (allOption) {
                    newOptions.push({ cityName: 'All Cities', cityId: 0 });
                }
                if (response.data.cities.length > 0) {
                    newOptions = newOptions.concat(response.data.cities);
                }
                let preSelectedValues = [];
                if (selectedValues.length > 0) {
                    preSelectedValues = newOptions.filter((c) => selectedValues.indexOf(c.cityId) >= 0);
                }
                const newProps = { ...defaultProps, options: newOptions, preSelectedValues, dataLoaded: true }
                setDefaultProps(newProps);
            }
        } 
        if (stateId && stateId > 0) {
            getCitiesOptions();
        } else {
            const newProps = { ...defaultProps, options: cityOptions, dataLoaded: true }
            setDefaultProps(newProps);
        }*/}

        let preSelectedValues = [];
        if (selectedValues.length > 0) {
            preSelectedValues = cityOptions.filter((c) => selectedValues.indexOf(c.cityId) >= 0);
        }
        const newProps = { ...defaultProps, preSelectedValues, dataLoaded: true }
        setDefaultProps(newProps);

    }, [stateId]);

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
import { useEffect, useState, forwardRef } from "react";
//import { useSelector } from 'react-redux';
import MultiSelectDropDown from "../form-components/MultiSelectDropDownComponent";
//import MultiSelectDropDownForm from "../form-components/MultiSelectDropDownFormComponent";
//import { fetchApi } from '../../services/apiService'

const CountryAutocomplete = forwardRef((props, ref) => {

    const { allOption = false, selectedValues = [], isFormikFormField = false, showFormError = false, ...rest } = props;
    let countryOptions = [];
    if (allOption) {
        countryOptions.push({ countryName: 'All Countries', countryId: 0 });
    }

    countryOptions.push(
        { countryName: 'India', countryId: 1 },
        { countryName: 'Kenya', countryId: 2 },
        { countryName: 'Uganda', countryId: 3 },
        { countryName: 'Tanzania', countryId: 4 },
        { countryName: 'Nigeria', countryId: 5 },
        { countryName: 'Mayanmar', countryId: 6 },
    );

    let initialProps = {
        ...rest,
        labelKey: 'countryName',
        primaryKey: 'countryId',
        options: countryOptions,
        isObject: true,
        isFormikFormField,
        showFormError,
        dataLoaded: false
    }
    const [defaultProps, setDefaultProps] = useState(initialProps);
    // Get Options
    //const userToken = useSelector((state) => state.login.userToken);
    useEffect(() => {
        {/* const getCountriesOptions = async () => {
            const getCountryParams = {};
            const response = await fetchApi('masters/getCountries',getCountryParams,userToken);
            if(response.status === 'Ok' && response.data.responseStatus === 'Ok'){
                let newOptions = [];
                if(allOption){
                    newOptions.push({countryName:'All Countries',countryId:0});
                }
                if(response.data.countries.length > 0){
                    newOptions = newOptions.concat(response.data.countries);
                }
                let preSelectedValues = [];
                if(selectedValues.length > 0){
                    preSelectedValues =  newOptions.filter((c) => selectedValues.indexOf(c.countryId) >= 0);
                }
                const newProps = {...defaultProps, options:newOptions, preSelectedValues, dataLoaded:true}
                setDefaultProps(newProps);
            }
        }
        getCountriesOptions(); */}

        let preSelectedValues = [];
        if (selectedValues.length > 0) {
            preSelectedValues = countryOptions.filter((c) => selectedValues.indexOf(c.countryId) >= 0);
        }
        const newProps = { ...defaultProps, preSelectedValues, dataLoaded: true }
        setDefaultProps(newProps);

        // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default CountryAutocomplete;
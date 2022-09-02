import { useEffect,useState, forwardRef } from "react";
import { useSelector } from 'react-redux';
import MultiSelectDropDown from "../form-components/MultiSelectDropDownComponent";
//import MultiSelectDropDownForm from "../form-components/MultiSelectDropDownFormComponent";
//import { fetchApi } from '../../services/apiService'

const StateAutocomplete = forwardRef((props,ref) => {
    const {allOption = false, selectedValues=[], countryId = undefined, isFormikFormField = false, showFormError = false, ...rest} = props;
    let stateOptions = [];
    if(allOption){
        stateOptions.push({stateName:'All States',stateId:0});
    }

    stateOptions.push(
        { stateName: 'Andhra Pradesh', stateId: 1 },
        { stateName: 'Bihar', stateId: 2 },
        { stateName: 'Chattisgarh', stateId: 3 },
        { stateName: 'Delhi', stateId: 4 },
        { stateName: 'Gujrat', stateId: 5 },
        { stateName: 'Haryana', stateId: 6 },
        { stateName: 'Himachal Pradesh', stateId: 7 },
        { stateName: 'Jammu', stateId: 8 },
        { stateName: 'Jharkhand', stateId: 9 },
        { stateName: 'Kashmir', stateId: 10 },
        { stateName: 'Ladakh', stateId: 11 },
        { stateName: 'Maharastra', stateId: 12 },
        { stateName: 'Orissa', stateId: 13 },
        { stateName: 'Punjab', stateId: 14 },
        { stateName: 'Kerala', stateId: 15 },
    );

    let initialProps = {
        ...rest,
        labelKey:'stateName',
        primaryKey:'stateId',
        options:stateOptions,
        isObject:true,
        isFormikFormField,
        showFormError,
        dataLoaded:false
    }

    const [defaultProps, setDefaultProps] = useState(initialProps);
    // Get Options
    //const userToken = useSelector((state) => state.login.userToken);
    useEffect(()=>{
        {/* const getStatesOptions = async () => {
            const getStateParams = {countryId};
            const response = await fetchApi('masters/getStates',getStateParams,userToken);
            if(response.status === 'Ok' && response.data.responseStatus === 'Ok'){
                let newOptions = [];
                if(allOption){
                    newOptions.push({stateName:'All States',stateId:0});
                }
                if(response.data.states.length > 0){
                    newOptions = newOptions.concat(response.data.states);
                }
                let preSelectedValues = [];
                if(selectedValues.length > 0){
                    preSelectedValues =  newOptions.filter((s) => selectedValues.indexOf(s.stateId) >= 0);
                }
                const newProps = {...defaultProps, options:newOptions, preSelectedValues, dataLoaded:true}
                setDefaultProps(newProps);
            }
        }
        getStatesOptions(); */}

        let preSelectedValues = [];
        if(selectedValues.length > 0){
            preSelectedValues =  stateOptions.filter((s) => selectedValues.indexOf(s.stateId) >= 0);
        }
        const newProps = {...defaultProps, preSelectedValues, dataLoaded:true}
        setDefaultProps(newProps);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[countryId]);

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

export default StateAutocomplete;
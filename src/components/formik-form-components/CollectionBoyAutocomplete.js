import { useEffect, useState, forwardRef } from "react";
import { useSelector } from 'react-redux';
import MultiSelectDropDown from "../form-components/MultiSelectDropDownComponent";
//import MultiSelectDropDownForm from "../form-components/MultiSelectDropDownFormComponent";
import api from '../../api/api';

const CollectionBoyAutocomplete = forwardRef((props, ref) => {

    const { allOption = false, selectedValues = [], isFormikFormField = false, showFormError = false, cityId = undefined, ...rest } = props;

    let collectionBoyOptions = [];
    if (allOption) {
        collectionBoyOptions.push({ name: 'All Cities', id: 0 });
    }

    let initialProps = {
        ...rest,
        labelKey: 'name',
        primaryKey: 'id',
        options: collectionBoyOptions,
        isObject: true,
        isFormikFormField,
        showFormError,
        dataLoaded: false
    }
    const [defaultProps, setDefaultProps] = useState(initialProps);
    // Get Options

    useEffect(() => {

        const getCitiesOptions = async () => {

            setDefaultProps({ ...defaultProps, dataLoaded: false });

            const getCollectionBoyParams = {};

            if (cityId > 0) {
                getCollectionBoyParams.cityId = cityId;
            }

            const response = await api.get("/collectionBoys", {
                params: getCollectionBoyParams
            });

            if (response.data) {

                let newOptions = [];

                if (allOption) {
                    newOptions.push({ name: 'All Cities', id: 0 });
                }

                if (response.data.length > 0) {
                    newOptions = newOptions.concat(response.data);
                }

                let preSelectedValues = [];
                if (selectedValues.length > 0) {
                    preSelectedValues = newOptions.filter((c) => selectedValues.indexOf(c.id) >= 0);
                }

                const newProps = { ...defaultProps, options: newOptions, preSelectedValues, dataLoaded: true }
                setDefaultProps(newProps);
            }
        }

        getCitiesOptions();

    }, [cityId]);

    return (defaultProps.dataLoaded ?
        !isFormikFormField ?
            <MultiSelectDropDown
                ref={ref}
                {...defaultProps}
            /> :
            {/* <MultiSelectDropDownForm
            ref={ref}
            {...defaultProps}
        /> */} : null
    );
});

export default CollectionBoyAutocomplete;
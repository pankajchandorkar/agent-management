import React, { useState, useRef } from 'react'
import { Grid, Box, Button, Link } from '@mui/material';
import CollectionBoyAutocomplete from '../formik-form-components/CollectionBoyAutocomplete';
import CityAutocomplete from '../formik-form-components/CityAutocomplete';
import '../../style/collectionBoy.scss';



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";


function CollectionBoyAreaBindingForm() {

    const cityRef = useRef(null);

    const [collectionBoyData, setCollectionBoyData] = useState({ 'collectionBoy': '', 'collectionBoyId': '' });
    const [collectionBoyCityData, setCollectionBoyCityData] = useState({ 'collectionBoyCity': '', 'collectionBoyCityId': '' });

    //for collection boys
    const getCollectionBoyProps = () => {
        return {
            id: 'collectionBoyId',
            label: 'Collection Boy',
            name: 'collectionBoyId',
            searchPlaceholder: "Search By Collection Boy",
            noDataLabel: "No Collection Boy Found",
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
            selectedValues: [],
        }
    }

    //for city
    const getCityProps = () => {
        return {
            id: 'collectionBoyCityId',
            label: 'City',
            name: 'collectionBoyCityId',
            searchPlaceholder: "Search By City Name",
            noDataLabel: "No City Found",
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
            selectedValues: [],
        }
    }

    const onCollectionBoyChange = (selectedCollectionBoy) => {
        if (selectedCollectionBoy.length > 0) {
            setCollectionBoyData((prevData) => ({ ...prevData, 'collectionBoy': selectedCollectionBoy[0].name, 'collectionBoyId': selectedCollectionBoy[0].id }));
        } else {
            setCollectionBoyData((prevData) => ({ ...prevData, 'collectionBoy': '', 'collectionBoyId': '' }));
        }
    }

    const onCityChange = (selectedCities) => {
        if (selectedCities.length > 0) {
            setCollectionBoyCityData((prevData) => ({ ...prevData, 'collectionBoyCity': selectedCities[0].cityName, 'collectionBoyCityId': selectedCities[0].cityId }));
        } else {
            setCollectionBoyCityData((prevData) => ({ ...prevData, 'collectionBoyCity': '', 'collectionBoyCityId': '' }));
        }
    }

    return (
        <div className='collectionBoyAreaBindingForm'>
            <Box sx={{ padding: "12px 25px", background: "#E5F3FE" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1.4 }}>
                    <Grid item xs={12} sm={6} md={6} >
                        <CollectionBoyAutocomplete
                            {...getCollectionBoyProps()}
                            onSelect={(selectedCollectionBoy) => { onCollectionBoyChange(selectedCollectionBoy) }}
                            onRemove={(selectedCollectionBoy) => { onCollectionBoyChange(selectedCollectionBoy) }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} >
                        <CityAutocomplete
                            {...getCityProps()}
                            ref={cityRef}
                            onSelect={(selectedCities) => { onCityChange(selectedCities) }}
                            onRemove={(selectedCities) => { onCityChange(selectedCities) }} />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ padding: "12px 25px" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
                    <Grid item xs={12} sm={6} md={5.5} >
                        <span className="heading">All Agent Area List</span>
                    </Grid>
                    <Grid item xs={12} sm={6} md={1} >

                    </Grid>
                    <Grid item xs={12} sm={6} md={5.5} >
                        <span className="heading">Selected Agent Area for Collection Boy</span>
                    </Grid>
                </Grid>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
                    <Grid item xs={12}>
                        <Box className="errorMessage">
                            <FontAwesomeIcon icon={faExclamationCircle} color={"#0086ff"} style={{ paddingRight: "5px", fontSize: "20px" }} />
                            Agent Area is already assigned to Selected Agent Area for this Collection Boy
                        </Box>
                    </Grid>
                </Grid>
                <Grid sx={{ paddingTop: "5px" }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
                    <Grid item xs={12} sm={6} md={5.5} >
                        <Box className="areabox">
                            <div className="agentarea">
                                Agent Area: Swargate
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={1} >
                        <Box className="leftRightIcon">
                            <div className="rightIcon"></div>
                            <div className="leftIcon"></div>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={5.5} >
                        <Box className="areabox">
                            <div className="agentarea">
                                Selected Agent Area: Swargate
                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default CollectionBoyAreaBindingForm

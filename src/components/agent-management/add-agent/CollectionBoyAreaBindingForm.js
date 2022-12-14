import React, { useState, useRef, useEffect } from 'react'
import { Grid, Box, Button, Link } from '@mui/material';
import CollectionBoyAutocomplete from '../../formik-form-components/CollectionBoyAutocomplete';
import CityAutocomplete from '../../formik-form-components/CityAutocomplete';
import '../../../style/collectionBoy.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import api from '../../../api/api';

function CollectionBoyAreaBindingForm(props) {

    const { onClose, onSave } = props;

    const cBoyRef = useRef(null);
    const cityRef = useRef(null);

    const initData = {
        "agentId": "",
        "collectionBoy": {
            "id": "",
            "name": "",
        },
        "collectionCity": {
            "id": "",
            "name": "",
        },
        "collectionArea": [],
        "collectionSelectedArea": []
    };

    const [agentArea, setAgentArea] = useState("");
    const [leftSideAgentArea, setLeftSideAgentArea] = useState(true);
    const [rightSideAgentArea, setRightSideAgentArea] = useState(false);

    const [collectionBoyData, setCollectionBoyData] = useState(initData);
    const [filterBy, setFilterBy] = useState("");
    const [selectedAreaId, setSelectedAreaId] = useState("");
    const [duplicateAgentArea, setDuplicateAgentArea] = useState(false);
    const [selectedAreaForBoy, setSelectedAreaForBoy] = useState({});
    const [formMode, setFormMode] = useState("Add");

    //for collection boys
    const getCollectionBoyProps = () => {

        let cityId = -1;
        let defaultSelectedVal = -1;

        if (formMode === "Add") {
            cityId = collectionBoyData.collectionCity.id;
        } else if (formMode === "Edit") {
            cityId = collectionBoyData.collectionCity.id;
            defaultSelectedVal = collectionBoyData.collectionBoy.id;
        }

        return {
            id: 'collectionBoyId',
            label: 'Collection Boy',
            name: 'collectionBoyId',
            searchPlaceholder: "Search By Collection Boy",
            noDataLabel: "No Collection Boy Found",
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
            cityId: cityId,
            selectedValues: [defaultSelectedVal],
        }
    }

    //for city
    const getCityProps = () => {

        return {
            id: 'collectionBoyCityId',
            label: 'Agent City',
            name: 'collectionBoyCityId',
            searchPlaceholder: "Search By City Name",
            noDataLabel: "No City Found",
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
        }
    }

    const onCollectionBoyChange = (selectedData) => {
        if (selectedData.length > 0) {
            setCollectionBoyData((prevData) => ({ ...prevData, collectionBoy: { name: selectedData[0].name, id: selectedData[0].id } }));
        } else {
            setCollectionBoyData((prevData) => ({ ...prevData, collectionBoy: { name: '', id: '' } }));
        }
        clearFormData();
    }

    const onCityChange = (selectedData) => {
        /*  if (selectedData.length > 0) {
             setCollectionBoyData((prevData) => ({ ...prevData, 'collectionCity': { name: selectedData[0].cityName, id: selectedData[0].cityId } }));
         } else {
             setCollectionBoyData((prevData) => ({ ...prevData, 'collectionCity': { name: '', id: '' } }));
         }
         clearFormData(); */
    }

    useEffect(() => {

        const { collectionBoy, collectionCity, collectionSelectedArea } = collectionBoyData;
        /* const cBoyId = collectionBoy.id;
        const cCityId = collectionCity.id;

        if (filterBy === "") {
            if (cBoyId > 0 && cCityId === "") {
                setFilterBy("CollectionBoy");
            }
            if (cBoyId === "" && cCityId > 0) {
                setFilterBy("City");
            }
        } else {
            if (cBoyId === "" && cCityId === "") {
                setFilterBy("");
            } else if (filterBy === "City" && cCityId === "") {
                setCollectionBoyData((prevData) => ({ ...prevData, collectionBoy: { name: '', id: '' } }));
                setFilterBy("");
            } else if (filterBy === "CollectionBoy" && cBoyId === "") {
                setCollectionBoyData((prevData) => ({ ...prevData, 'collectionCity': { name: '', id: '' } }));
                setFilterBy("");
            }
        } */

        setLeftSideAgentArea(true);
        setRightSideAgentArea(false);

        if (collectionSelectedArea.length) {
            collectionSelectedArea.map((selArea) => {
                if (agentArea != "" && agentArea === selArea.area) {
                    setRightSideAgentArea(true);
                    setLeftSideAgentArea(false);
                }
            });
        }
    }, [collectionBoyData]);

    //for filter by collection boy city auto select
    //but city name and id not updated in state
    //below code is used to update city and id in state
    const forHoldCityData = (cityData) => {
        if (cityData.length > 0) {
            const { cityId, cityName } = cityData[0];
            setCollectionBoyData((prevData) => ({ ...prevData, 'collectionCity': { name: cityName, id: cityId } }));
        }
    }

    const handelLoadArea = async () => {

        const { collectionBoy, collectionCity } = collectionBoyData;
        const cBoyId = collectionBoy.id;
        const cCityId = collectionCity.id;

        if (cBoyId > 0 && cCityId > 0) {

            clearFormData();
            const getAreaParams = { cityId: cCityId };
            const response = await api.get("/areas", {
                params: getAreaParams
            });
            if (response.data) {
                setCollectionBoyData((prevData) => ({ ...prevData, 'collectionArea': response.data }));
            }
        } else {
            alert("Collection Boy & City should not be empty !");
        }
    }

    const handelAddToSelAreaList = () => {

        if (selectedAreaId > 0) {

            setDuplicateAgentArea(false);

            const areaData = collectionBoyData.collectionArea.filter((data, index) => {
                return data.areaId === selectedAreaId
            })[0];

            let tempPrevData = { ...collectionBoyData }
            let tempSelAreaData = tempPrevData.collectionSelectedArea;

            //for checking if selected area already present in selected area list or not
            const duplicateAreaData = tempSelAreaData.filter(data => {
                return data.areaId === areaData.areaId
            });

            if (duplicateAreaData.length > 0) {
                setDuplicateAgentArea(true);
            } else {
                tempSelAreaData.push({ area: areaData.area, areaId: areaData.areaId })
                tempPrevData = { ...tempPrevData, 'collectionSelectedArea': tempSelAreaData }
                setCollectionBoyData(tempPrevData);
            }
        } else {
            alert("Please select area to add in selected area list !");
        }
    }

    const handelSelectedAreaForBoy = (areaId, area) => {
        setSelectedAreaForBoy({ areaId: areaId, area: area });
    }

    const handelRemoveToSelAreaList = () => {

        if (selectedAreaForBoy.areaId > 0) {

            let tempPrevData = { ...collectionBoyData }
            let tempSelAreaData = tempPrevData.collectionSelectedArea;

            let newSelAreaData = tempSelAreaData.filter((data) => {
                return data.areaId !== selectedAreaForBoy.areaId;
            });

            tempPrevData = { ...tempPrevData, 'collectionSelectedArea': newSelAreaData };
            setCollectionBoyData(tempPrevData);
            setSelectedAreaForBoy({});

        } else {
            alert("Please select selected agent area for remove from list !");
        }
    }

    const clearFormData = () => {
        setCollectionBoyData((prevData) => ({ ...prevData, 'collectionArea': [], 'collectionSelectedArea': [] }));
        setSelectedAreaId("");
        setSelectedAreaForBoy({});
    }

    useEffect(() => {

        const getAgentCollectionBoyDetails = async () => {

            const params = { agentId: 1 };

            if (params.agentId > 0) {

                const response = await api.get("/collectionBoyAreaBind", {
                    params: params
                });

                if (response.data.length > 0) {

                    setFormMode("Edit");
                    setFilterBy("CollectionBoy");

                    const editAgentData = response.data;
                    const { agentId, collectionArea, collectionBoy, collectionCity, collectionSelectedArea } = editAgentData[0];

                    const editData = {
                        "agentId": agentId,
                        "collectionBoy": {
                            "id": collectionBoy.id,
                            "name": collectionBoy.name,
                        },
                        "collectionCity": {
                            "id": collectionCity.id,
                            "name": collectionCity.name,
                        },
                        "collectionArea": collectionArea,
                        "collectionSelectedArea": collectionSelectedArea
                    };

                    /* if (collectionArea.length) {
                        setSelectedAreaId(collectionArea[0].areaId);
                    }

                    if (collectionSelectedArea.length) {
                        setSelectedAreaForBoy({ areaId: collectionSelectedArea[0].areaId, area: collectionSelectedArea[0].area });
                    } */

                    setCollectionBoyData(editData);

                } else {
                    const addData = {
                        "agentId": 1,
                        "collectionBoy": {
                            "id": "",
                            "name": "",
                        },
                        "collectionCity": {
                            "id": 4,
                            "name": "Mumbai",
                        },
                        "collectionArea": [],
                        "collectionSelectedArea": []
                    };
                    setCollectionBoyData(addData);
                }
            }
        }

        getAgentCollectionBoyDetails();

        setAgentArea("Dharavi");

    }, []);

    const handleClose = () => {
        onClose(false);
    };

    const handleSave = () => {
        onSave(collectionBoyData);
    }

    return (
        <div className='collectionBoyAreaBindingForm'>
            <Box sx={{ padding: "12px 25px", background: "#E5F3FE" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1.4 }}>
                    <Grid item xs={12} sm={5} md={5} >
                        {collectionBoyData.collectionCity.id && (<CityAutocomplete
                            {...getCityProps()}
                            ref={cityRef}
                            disabled={true}
                            selectedValues={[collectionBoyData.collectionCity.id]}
                            onSelect={(selectedData) => { onCityChange(selectedData) }}
                            onRemove={(selectedData) => { onCityChange(selectedData) }}
                            forHoldCityData={(data) => { forHoldCityData(data) }} />)}

                    </Grid>
                    <Grid item xs={12} sm={5} md={5} >
                        <CollectionBoyAutocomplete
                            {...getCollectionBoyProps()}
                            ref={cBoyRef}
                            onSelect={(selectedData) => { onCollectionBoyChange(selectedData) }}
                            onRemove={(selectedData) => { onCollectionBoyChange(selectedData) }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={2} md={2} >
                        <Button style={{ padding: "6px 0px" }} variant="contained" size="medium" className="btn-orange" onClick={handelLoadArea}>Load Area</Button>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ padding: "12px 25px", minHeight: "365px" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
                    <Grid item xs={12} sm={5.5} md={5.5} >
                        <span className="heading">All Agent Area List For: {collectionBoyData.collectionCity.name}</span>
                    </Grid>
                    <Grid item xs={12} sm={1} md={1} >

                    </Grid>
                    <Grid item xs={12} sm={5.5} md={5.5} >
                        <span className="heading">Selected Agent Area for Collection Boy</span>
                    </Grid>
                </Grid>
                {duplicateAgentArea && (
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
                        <Grid item xs={12}>
                            <Box className="errorMessage">
                                <FontAwesomeIcon icon={faExclamationCircle} color={"#0086ff"} style={{ paddingRight: "5px", fontSize: "20px" }} />
                                Agent Area is already assigned to Selected Agent Area for this Collection Boy
                            </Box>
                        </Grid>
                    </Grid>)
                }
                <Grid sx={{ paddingTop: "5px" }} container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
                    <Grid item xs={12} sm={5.5} md={5.5} >
                        <Box className="areabox">
                            {
                                leftSideAgentArea && (
                                    <div className="agentarea">
                                        Select Agent Area: {agentArea}
                                    </div>
                                )
                            }
                            <div className={`agentAreaList ${!leftSideAgentArea ? 'extended':''}`}>
                                {collectionBoyData.collectionArea.length > 0 && (
                                    collectionBoyData.collectionArea.map((area, index) => {
                                        let inArr = false;
                                        {
                                            if (collectionBoyData.collectionSelectedArea.length > 0) {
                                                let selAreaObj = collectionBoyData.collectionSelectedArea.filter((selArea) => {
                                                    return selArea.areaId === area.areaId
                                                });
                                                if (selAreaObj.length > 0) {
                                                    inArr = true;
                                                }
                                            }
                                        }
                                        return (
                                            <div
                                                className={`areaListItem ${selectedAreaId === area.areaId ? 'active' : ''} ${inArr ? 'selColBoyArea' : ''}`}
                                                onClick={() => { setSelectedAreaId(area.areaId) }}
                                                key={"agent-area-" + area.areaId}>
                                                {area.area}{inArr}
                                            </div>
                                        )
                                    })
                                )}

                               

                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={1} md={1} >
                        <Box className="leftRightIcon">
                            <div className="rightIcon" onClick={() => { handelAddToSelAreaList() }}></div>
                            <div className="leftIcon" onClick={() => { handelRemoveToSelAreaList() }}></div>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={5.5} md={5.5} >
                        <Box className="areabox">
                            {rightSideAgentArea && (
                                <div className="agentarea">Selected Agent Area: {agentArea}</div>
                            )}
                            <div className={`agentAreaListSelected ${!rightSideAgentArea ? 'extended':''}`}>
                                {collectionBoyData.collectionSelectedArea.length > 0 && (
                                    collectionBoyData.collectionSelectedArea.map((area, index) => {
                                        return (<div className={`areaListSelItem ${selectedAreaForBoy.areaId === area.areaId ? 'active' : ''}`} onClick={() => { handelSelectedAreaForBoy(area.areaId, area.area) }} key={"sel-agent-area-" + area.areaId}>{area.area}</div>)
                                    })
                                )}
                                

                            </div>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{
                padding: "20px 25px 12px 25px", borderTop: "solid 1px #B2B2B2", display: "flex",
                justifyContent: "flex-end!important"
            }}>
                <Button
                    style={{ padding: "6px 0px", width: "100px" }}
                    variant="outlined"
                    size="medium"
                    className="btn-orange-outline"
                    onClick={handleClose}
                >
                    Cancel
                </Button>
                <Button
                    style={{ padding: "6px 0px", width: "100px", marginLeft: "10px" }}
                    variant="contained"
                    size="medium"
                    className="btn-orange"
                    onClick={handleSave}
                >
                    Save
                </Button>
            </Box>
        </div>
    )
}

export default CollectionBoyAreaBindingForm

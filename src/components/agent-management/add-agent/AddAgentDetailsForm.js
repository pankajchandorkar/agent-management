import React, { useState, useEffect } from 'react'
import { Grid, Box, Button } from '@mui/material';
import AgentTypeAutocomplete from "../../formik-form-components/AgentTypeAutocomplete";
import StateAutocomplete from '../../formik-form-components/StateAutocomplete';
import CityAutocomplete from '../../formik-form-components/CityAutocomplete';
import AreaAutocomplete from '../../formik-form-components/AreaAutocomplete';
import DivisionAutocomplete from '../../formik-form-components/DivisionAutocomplete';

import Checkbox from "@mui/material/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faAngleDoubleRight, faMap } from "@fortawesome/free-solid-svg-icons";

import ColorPicker from '../../common/ColorPicker';
import TextBox from '../../common/TextBox';

function AddAgentDetailsForm(props) {

    const { manageFinancialInfoTab } = props;

    const [agentTypeData, setAgentTypeData] = useState({ 'agentType': '', 'agentTypeId': '' });
    const [agentPAN, setAgentPAN] = useState("");
    const [agentLegalNamePAN, setAgentLegalNamePAN] = useState("");
    const [agentPANVerified, setAgentPANVerified] = useState(false);

    const [agentGSTIN, setAgentGSTIN] = useState("");
    const [agentLegalNameGSTIN, setAgentLegalNameGSTIN] = useState("");
    const [agentGSTINVerified, setAgentGSTINVerified] = useState(false);

    const [agentAgencyName, setAgentAgencyName] = useState("");
    const [agentOwnerName, setAgentOwnerName] = useState("");
    const [agentMobile, setAgentMobile] = useState("");
    const [agentEmail, setAgentEmail] = useState("");
    const [agentAddress, setAgentAddress] = useState("");

    const [agentStateData, setAgentStateData] = useState({ 'agentState': '', 'agentStateId': '' });
    const [agentCityData, setAgentCityData] = useState({ 'agentCity': '', 'agentCityId': '' });
    const [agentAreaData, setAgentAreaData] = useState({ 'agentArea': '', 'agentAreaId': '' });
    const [agentDivisionData, setAgentDivisionData] = useState({ 'agentDivision': '', 'agentDivisionId': '' });
    const [agentPincode, setAgentPincode] = useState("");

    const [agentColorCode, setAgentColorCode] = useState("#DDDEEE");
    const [showColorPicker, setShowColorPicker] = useState(false);

    //for agent type
    const getAgentTypeProps = () => {
        return {
            id: 'acagentType',
            label: 'Agent Type',
            searchPlaceholder: "Search By Agent Type",
            sx: { width: 200 },
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
            canSearch: false,
            selectedValues: [-1]
        }
    }

    //for state
    const getStateProps = () => {
        return {
            id: 'stateId',
            label: 'State',
            name: 'stateId',
            searchPlaceholder: "Search By State Name",
            noDataLabel: "No State Found",
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
            selectedValues: [],
        }
    }

    //for city
    const getCityProps = () => {
        return {
            id: 'cityId',
            label: 'City',
            name: 'cityId',
            searchPlaceholder: "Search By City Name",
            noDataLabel: "No City Found",
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
            selectedValues: [4],
        }
    }

    //for area
    const getAreaProps = () => {
        return {
            id: 'areaId',
            label: 'Area',
            name: 'areaId',
            searchPlaceholder: "Search By Area Name",
            noDataLabel: "No Area Found",
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
            selectedValues: [8],
        }
    }

    //for division
    const getDivisionProps = () => {
        return {
            id: 'divisionId',
            label: 'Division',
            name: 'divisionId',
            searchPlaceholder: "Search By Division",
            noDataLabel: "No Division Found",
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
            selectedValues: [],
        }
    }

    const handleAgentTypeChanged = (selectedAgentType) => {
        if (selectedAgentType.length > 0) {
            setAgentTypeData(prevData => ({ ...prevData, agesetAgentTypeDatantType: selectedAgentType[0].agentType, agentTypeId: selectedAgentType[0].agentTypeId }));
        } else {
            setAgentTypeData(prevData => ({ ...prevData, agesetAgentTypeDatantType: "", agentTypeId: "" }));
        }
    }

    const onStateChange = (selectedStates) => {
        if (selectedStates.length > 0) {
            setAgentStateData((prevData) => ({ ...prevData, 'agentState': selectedStates[0].stateName, 'agentStateId': selectedStates[0].stateId }));
        } else {
            setAgentStateData((prevData) => ({ ...prevData, 'agentState': '', 'agentStateId': '' }));
        }
    }

    const onCityChange = (selectedCity) => {
        if (selectedCity.length > 0) {
            setAgentCityData((prevData) => ({ ...prevData, 'agentCity': selectedCity[0].cityName, 'agentCityId': selectedCity[0].cityId }));
        } else {
            setAgentCityData((prevData) => ({ ...prevData, 'agentCity': '', 'agentCityId': '' }));
        }
    }

    const onAreaChange = (selectedArea) => {
        if (selectedArea.length > 0) {
            setAgentAreaData((prevData) => ({ ...prevData, 'agentArea': selectedArea[0].areaName, 'agentAreaId': selectedArea[0].areaId }));
        } else {
            setAgentAreaData((prevData) => ({ ...prevData, 'agentArea': '', 'agentAreaId': '' }));
        }
    }

    const onDivisionChange = (selectedDivision) => {
        if (selectedDivision.length > 0) {
            setAgentDivisionData((prevData) => ({ ...prevData, 'agentDivision': selectedDivision[0].divisionName, 'agentDivisionId': selectedDivision[0].divisionId }));
        } else {
            setAgentDivisionData((prevData) => ({ ...prevData, 'agentDivision': '', 'agentDivisionId': '' }));
        }
    }

    const displayColorPicker = () => {
        setShowColorPicker(true);
    }

    const onAcceptPicker = (color) => {
        setAgentColorCode(color);
        setShowColorPicker(false);
    }

    const onCancelPicker = () => {
        setShowColorPicker(false);
    }

    const onPANNoChange = (event) => {
        setAgentPAN(event.target.value);
    }

    const handelVerifyPAN = () => {
        setAgentPANVerified(false);
        setAgentLegalNamePAN("");
        if (agentPAN === "") {
            alert("Please enter PAN No.");
        } else {
            setAgentPANVerified(true);
            setAgentLegalNamePAN("Agent Legal Name Here");
        }
    }

    useEffect(() => {
        setAgentPANVerified(false);
        setAgentLegalNamePAN("");
    }, [agentPAN]);


    const onGSTINChange = (event) => {
        setAgentGSTIN(event.target.value);
    }

    const handelVerifyGSTIN = () => {
        setAgentGSTINVerified(false);
        setAgentLegalNameGSTIN("");
        if (agentGSTIN === "") {
            alert("Please enter GSTIN No.");
        } else {
            setAgentGSTINVerified(true);
            setAgentLegalNameGSTIN("Agent Legal Name Here");
        }
    }

    useEffect(() => {
        setAgentGSTINVerified(false);
        setAgentLegalNameGSTIN("");
    }, [agentGSTIN]);

    const handelSaveMtplProceed = () => {
        manageFinancialInfoTab();
    }

    return (
        <div className='addAgentDetailsForm'>
            <Box sx={{ borderBottom: "solid 1px #CCCCCC", padding: "12px 0px" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1.4 }}>
                    <Grid className="agentCode" item xs={7} sm={6} md={3} >
                        Agent Details (Agent Code: 9786)
                    </Grid>
                    <Grid item xs={5} sm={6} md={3} >
                        <AgentTypeAutocomplete
                            {...getAgentTypeProps()}
                            onSelect={handleAgentTypeChanged}
                            onRemove={handleAgentTypeChanged} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} >
                        <div className='inputWrap'>
                            <div className='inputActive'>
                                <label>Active:</label>
                                <Checkbox size="small" sx={{
                                    '&.Mui-checked': {
                                        color: "#1fd544",
                                    },
                                }} />
                            </div>
                            <div className='inputBlacklist'>
                                <label>Blacklist:</label>
                                <Checkbox size="small" sx={{
                                    '&.Mui-checked': {
                                        color: "#FF5152",
                                    },
                                }} />
                            </div>
                            <div className='inputColorCode'>
                                <label>Color Code:</label>
                                <div className="colorWrap" onClick={displayColorPicker}>
                                    <div className="colorPreview" style={{ background: agentColorCode }}></div>
                                    <div className="colorName">{agentColorCode}</div>
                                    <div className="colorCaretDown">
                                        <FontAwesomeIcon icon={faCaretDown} color={"#777"} />
                                    </div>
                                </div>
                            </div>
                            {showColorPicker && (
                                <div className="colorPicker">
                                    <ColorPicker
                                        color={agentColorCode}
                                        onAcceptPicker={onAcceptPicker}
                                        onCancelPicker={onCancelPicker}
                                    />
                                </div>
                            )}
                            <Box sx={{ width: '140px', position: 'absolute', right: '0' }}>
                                <Button style={{ padding: '7px 0' }} variant="contained" size="medium" className="btn-orange" >Save & Proceed</Button>
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ padding: "20px 0 5px 0", fontSize: "13px" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1.4 }}>
                    <Grid className="fetchDataBy" item xs={7} sm={6} md={3} >
                        <label>Fetch Details Using PAN :</label>
                    </Grid>
                    <Grid item xs={3.7} sm={5} md={2.4} >
                        <TextBox label="Enter PAN" name="panno" value={agentPAN} handleOnChange={onPANNoChange} />
                    </Grid>
                    <Grid item xs={0.3} sm={1} md={0.6} >
                        <Button variant="contained" size="medium" className="btn-orange" onClick={handelVerifyPAN}>
                            <FontAwesomeIcon
                                icon={faAngleDoubleRight}
                                color="#FFFFFF"
                                style={{ fontSize: "18px" }} />
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} >
                        <Box sx={{ display: 'flex' }}>
                            <TextBox label="Legal Name (PAN)" name="legalNamePAN" disabled={true} value={agentLegalNamePAN} />
                            {agentPANVerified && (<Box className="verified">
                                <img src="./images/verified-user.svg" alt="verified user" style={{ paddingLeft: '5px' }} />
                                &nbsp;Verified
                            </Box>)}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ padding: "20px 0 5px 0", fontSize: "13px" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1.4 }}>
                    <Grid className="fetchDataBy" item xs={7} sm={6} md={3} >
                        <label>Fetch Details Using GSTIN :</label>
                    </Grid>
                    <Grid item xs={3.7} sm={5} md={2.4} >
                        <TextBox label="Enter GSTIN" name="gstin" value={agentGSTIN} handleOnChange={onGSTINChange} />
                    </Grid>
                    <Grid item xs={0.3} sm={1} md={0.6} >
                        <Button variant="contained" size="medium" className="btn-orange" onClick={handelVerifyGSTIN}>
                            <FontAwesomeIcon
                                icon={faAngleDoubleRight}
                                color="#FFFFFF"
                                style={{ fontSize: "18px" }} />
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} >
                        <Box sx={{ display: 'flex' }}>
                            <TextBox label="Legal Name (GSTIN)" value={agentLegalNameGSTIN} name="legalNameGSTIN" disabled={true} />
                            {
                                agentGSTINVerified && (
                                    <Box className="verified">
                                        <img src="./images/verified-user.svg" alt="verified user" style={{ paddingLeft: '5px' }} />
                                        &nbsp;Verified
                                    </Box>)
                            }
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ padding: "15px 0 5px 0", fontSize: "13px" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1.4 }}>
                    <Grid item xs={12} sm={6} md={3} >
                        <TextBox label="Agency Name" name="panNo" isCompulsory={true} value={agentAgencyName} handleOnChange={(e) => setAgentAgencyName(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} >
                        <TextBox label="Owner / Proprietor Name" name="ownerName" value={agentOwnerName} handleOnChange={(e) => setAgentOwnerName(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} >
                        <TextBox label="Mobile No" name="mobileNo" isCompulsory={true} value={agentMobile} handleOnChange={(e) => setAgentMobile(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} >
                        <TextBox label="Email ID" name="emailId" value={agentEmail} handleOnChange={(e) => setAgentEmail(e.target.value)} />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ padding: "15px 0 5px 0", fontSize: "13px" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1.4 }}>
                    <Grid item xs={12} sm={6} md={10.5} >
                        <TextBox label="Address" name="address" value={agentAddress} handleOnChange={(e) => setAgentAddress(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={1.5} >
                        <Button variant="outlined" size="small" className="btn-lightblue" startIcon={<FontAwesomeIcon
                            icon={faMap}
                            color="#0085FE"
                        />}>
                            Map Location
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ padding: "15px 0 5px 0", fontSize: "13px" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1.4 }}>
                    <Grid item xs={12} sm={6} md={3} >
                        <StateAutocomplete
                            {...getStateProps()}
                            countryId={1}
                            onSelect={(selectedStates) => { onStateChange(selectedStates) }}
                            onRemove={(selectedStates) => { onStateChange(selectedStates) }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} >
                        <CityAutocomplete
                            {...getCityProps()}
                            onSelect={(selectedCities) => { onCityChange(selectedCities) }}
                            onRemove={(selectedCities) => { onCityChange(selectedCities) }} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} >
                        <AreaAutocomplete
                            {...getAreaProps()}
                            onSelect={(selectedArea) => { onAreaChange(selectedArea) }}
                            onRemove={(selectedArea) => { onAreaChange(selectedArea) }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={1.5} >
                        <DivisionAutocomplete
                            {...getDivisionProps()}
                            onSelect={(selectedDivision) => { onDivisionChange(selectedDivision) }}
                            onRemove={(selectedDivision) => { onDivisionChange(selectedDivision) }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={1.5} >
                        <TextBox label="PIN Code" name="pincode" value={agentPincode} handleOnChange={(e) => setAgentPincode(e.target.value)} />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ padding: "15px 0 20px 0", fontSize: "13px" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1.4 }}>
                    <Grid item xs={12} sm={6} md={2} >
                        <TextBox label="Agent Start Date" name="startDate" calIcon={true} disabled={true} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} >
                        <TextBox label="Agent Inactive From Date" name="inactiveDate" calIcon={true} disabled={true} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} >
                        <TextBox label="Agent Blacklist From Date" name="blacklistDate" calIcon={true} disabled={true} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} >

                    </Grid>
                    <Grid item xs={1}>
                        <Button variant="outlined" size="medium" className="btn-orange-outline" >Cancel</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Button style={{ padding: "6px 0px" }} variant="contained" size="medium" className="btn-orange" onClick={handelSaveMtplProceed}>Save with MTPL rights</Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default AddAgentDetailsForm
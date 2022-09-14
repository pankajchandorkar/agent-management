import React, { useState } from 'react'
import { Grid, Box, Button, Link } from '@mui/material';
import TextBox from '../../common/TextBox';
import PaymentTypeAutocomplete from "../../formik-form-components/PaymentTypeAutocomplete";
import CommissionTypeAutocomplete from "../../formik-form-components/CommissionTypeAutocomplete";
import CollectionBoyAutocomplete from '../../formik-form-components/CollectionBoyAutocomplete';

import Radio from '@mui/material/Radio';
import Checkbox from "@mui/material/Checkbox";
import CustomizedDialogs from '../../common/CustomizedDialogs';
import CollectionBoyAreaBindingForm from './CollectionBoyAreaBindingForm';


import api from '../../../api/api';


function AddFinancialInfoForm() {



    const [commInputLabel, setCommInputLabel] = useState("Amount");
    const [collectionBoyData, setCollectionBoyData] = useState({ 'collectionBoy': '', 'collectionBoyId': '' });
    const [showDialog, setShowDialog] = useState(false);


    //for payment type
    const getFilterPaymentTypeProps = () => {
        return {
            id: 'acpaymentType',
            label: 'Payment Type',
            searchPlaceholder: "Search By Payment Type",
            sx: { width: 200 },
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
            canSearch: false,
            selectedValues: [-1]
        }
    }

    //for commission type
    const getFilterCommissionTypeProps = () => {
        return {
            id: 'accommissionType',
            label: 'Commission Type',
            searchPlaceholder: "Search By Commission Type",
            sx: { width: 200 },
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
            canSearch: false,
            selectedValues: [-1]
        }
    }

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

    const handlePaymentTypeChanged = (selectedPaymentType) => {
        if (selectedPaymentType.length > 0) {
            // setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, paymentType: selectedPaymentType[0].paymentType, paymentTypeId: selectedPaymentType[0].paymentTypeId }));
        } else {
            //setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, paymentType: '', paymentTypeId: '' }));
        }
    }

    const handleCommissionTypeChanged = (selectedCommissionType) => {
        if (selectedCommissionType.length > 0) {
            //setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, commType: selectedCommissionType[0].commType, commTypeId: selectedCommissionType[0].commTypeId }));
        } else {
            //setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, commType: '', commTypeId: '' }));
        }
    }

    const onCollectionBoyChange = (selectedCollectionBoy) => {
        if (selectedCollectionBoy.length > 0) {
            setCollectionBoyData((prevData) => ({ ...prevData, 'collectionBoy': selectedCollectionBoy[0].name, 'collectionBoyId': selectedCollectionBoy[0].id }));
        } else {
            setCollectionBoyData((prevData) => ({ ...prevData, 'collectionBoy': '', 'collectionBoyId': '' }));
        }
    }

    const [selectedValue, setSelectedValue] = useState('A');

    const handleChange = (event) => {
        let newVal = event.target.value;
        let newLabel = newVal === "P" ? "Enter Percentage" : "Enter Amount";
        setSelectedValue(newVal);
        setCommInputLabel(newLabel);
    };

    const handelSaveProceed = async (formData) => {

        const response = await api.put('/collectionBoyAreaBind/1', formData)


        if (response.data) {
            console.log(response.data);
        }


        setShowDialog(false);


    }

    const handleOnClose = (props) => {
        setShowDialog(props);
    }

    return (
        <div className='addFinancialInfoForm'>
            <Box sx={{ padding: "12px 0px" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1.4 }}>
                    <Grid className="agentCode" item xs={7} sm={6} md={3} >
                        Financial Info (Agent Code: 9786)
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ padding: "5px 0 15px", borderBottom: "solid 1px #CCCCCC", }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid className="agentCode" item xs={7} sm={6} md={5} >
                        <Box sx={{ display: 'flex' }}>
                            <TextBox label="GSTIN" name="gstin" />
                            <Box className="verified">
                                <img src="./images/verified-user.svg" alt="verified user" style={{ paddingLeft: '5px' }} />
                                &nbsp;Verified
                            </Box>
                        </Box>
                    </Grid>
                    <Grid className="agentCode" item xs={7} sm={6} md={2}>
                        &nbsp;
                    </Grid>
                    <Grid className="agentCode" item xs={7} sm={6} md={5} >
                        <Box sx={{ display: 'flex' }}>
                            <TextBox label="PAN" name="panno" />
                            <Box className="verified">
                                <img src="./images/verified-user.svg" alt="verified user" style={{ paddingLeft: '5px' }} />
                                &nbsp;Verified
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ padding: "7px 0 15px", borderBottom: "solid 1px #CCCCCC", }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid className="agentCode" item xs={7} sm={6} md={2.5} >
                        <Box className="fyiLable">Legal Name of Business</Box>
                        <Box className="fyiText">MANTIS TECH SERVICES PRIVATE LIMITED</Box>
                    </Grid>
                    <Grid className="agentCode" item xs={7} sm={6} md={2.5} >
                        <Box className="fyiLable">Trade Name</Box>
                        <Box className="fyiText">NA</Box>
                    </Grid>
                    <Grid className="agentCode" item xs={7} sm={6} md={2}>
                        <Box className="fyiLable">Effective Date of registration</Box>
                        <Box className="fyiText">11/05/2020</Box>
                    </Grid>
                    <Grid className="agentCode" item xs={7} sm={6} md={2} >
                        <Box className="fyiLable">Constitution of Business</Box>
                        <Box className="fyiText">Private Limited Company</Box>
                    </Grid>
                    <Grid className="agentCode" item xs={7} sm={6} md={1.5} >
                        <Box className="fyiLable">GSTIN / UIN Status</Box>
                        <Box className="fyiText">Active</Box>
                    </Grid>
                    <Grid className="agentCode" item xs={7} sm={6} md={1.5} >
                        <Box className="fyiLable">Taxpayer Type</Box>
                        <Box className="fyiText">Regular</Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ padding: "7px 0 15px", borderBottom: "solid 1px #CCCCCC", }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid className="agentCode" item xs={7} sm={6} md={4} >
                        <Box className="fyiLable">Administrative Office</Box>
                        <Box className="fyiText">(JURISDICTION - STATE) State - Karnataka Division - DGSTO-1 Bengaluru LOCAL GST Office - LGSTO 021 - Bengaluru</Box>
                    </Grid>
                    <Grid className="agentCode" item xs={7} sm={6} md={4} >
                        <Box className="fyiLable">Other Office</Box>
                        <Box className="fyiText">(JURISDICTION - CENTER) Commissionerate - BENGALURU EAST Division - EAST DIVISION-1 Range - RANCE-AED1</Box>
                    </Grid>
                    <Grid className="agentCode" item xs={7} sm={6} md={4} >
                        <Box className="fyiLable">Principal Place of Business</Box>
                        <Box className="fyiText">45/3, 1st, GOPALA KRISHNA COMPLEX, RESIDENCEY ROAD, BENGALURU, Bengaluru Urban, Karnataka, 560025</Box>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ borderBottom: "solid 1px #CCCCCC", }}>
                <Grid container >
                    <Grid sx={{ borderRight: "solid 1px #CCCCCC" }} item xs={7} sm={6} md={1.9} >
                        <Box sx={{ padding: "10px 10px 10px 0px" }}>
                            <PaymentTypeAutocomplete
                                {...getFilterPaymentTypeProps()}
                                onSelect={handlePaymentTypeChanged}
                                onRemove={handlePaymentTypeChanged} />
                        </Box>
                    </Grid>
                    <Grid item xs={7} sm={6} md={1.9} >
                        <Box sx={{ padding: "10px 10px 10px 10px", display: "flex", alignItems: "center" }}>
                            <CommissionTypeAutocomplete
                                {...getFilterCommissionTypeProps()}
                                onSelect={handleCommissionTypeChanged}
                                onRemove={handleCommissionTypeChanged} />
                        </Box>
                    </Grid>
                    <Grid item xs={7} sm={6} md={1.5} sx={{ display: "flex", alignItems: "center" }}>
                        <Radio
                            checked={selectedValue === 'A'}
                            onChange={handleChange}
                            value="A"
                            name="rdoCommType"
                            id="rdoCommType-A"
                            size="small"
                            className="rdoamount"
                        />
                        <label className="lblamount" htmlFor="rdoCommType-A">Amount</label>
                        <Radio
                            checked={selectedValue === 'P'}
                            onChange={handleChange}
                            value="P"
                            name="rdoCommType"
                            id="rdoCommType-P"
                            size="small"
                            className="rdopercent"
                        />
                        <label className="lblpercent" htmlFor="rdoCommType-P">Percentage</label>

                    </Grid>
                    <Grid sx={{ borderRight: "solid 1px #CCCCCC" }} item xs={7} sm={6} md={1.5} >
                        <Box sx={{ padding: "10px 10px 10px 10px", display: "flex", alignItems: "center" }}>
                            <TextBox label={commInputLabel} name="commval" />
                        </Box>
                    </Grid>
                    <Grid item xs={7} sm={6} md={0.7} >
                        <Box sx={{ padding: "10px 10px 10px 10px", display: "flex", alignItems: "center" }}>
                            <Checkbox size="small" sx={{
                                '&.Mui-checked': {
                                    color: "#0185FF",
                                },
                            }} />
                            <label className="lbltds">TDS</label>
                        </Box>
                    </Grid>
                    <Grid item xs={7} sm={6} md={1.5} >
                        <Box sx={{ padding: "10px 10px 10px 10px", display: "flex", alignItems: "center" }}>
                            <TextBox label="TDS Percentage %" name="tdsper" />
                        </Box>
                    </Grid>
                    <Grid item xs={7} sm={6} md={1.5} >
                        <Box sx={{ padding: "10px 10px 10px 10px", display: "flex", alignItems: "center" }}>
                            <TextBox label="TDS Start Date" name="tdsStartDate" calIcon={true} disabled={true} />
                        </Box>
                    </Grid>
                    <Grid item xs={7} sm={6} md={1.5} >
                        <Box sx={{ padding: "10px 10px 10px 10px", display: "flex", alignItems: "center" }}>
                            <Checkbox size="small" sx={{
                                '&.Mui-checked': {
                                    color: "#0185FF",
                                },
                            }} />
                            <label className="lblvouchergen">Voucher Generation</label>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ padding: "15px 0 25px 0", fontSize: "13px" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1.4 }}>
                    <Grid item xs={3.8}>
                        <CollectionBoyAutocomplete
                            {...getCollectionBoyProps()}
                            onSelect={(selectedCollectionBoy) => { onCollectionBoyChange(selectedCollectionBoy) }}
                            onRemove={(selectedCollectionBoy) => { onCollectionBoyChange(selectedCollectionBoy) }}
                        />
                    </Grid>
                    <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
                        <Link href="#" rel="noopener" className="link" onClick={() => { setShowDialog(true) }}>
                            Collection Boy Area Binding
                        </Link>
                    </Grid>
                    <Grid item xs={2.7}>
                        &nbsp;
                    </Grid>
                    <Grid item xs={1}>
                        <Button variant="outlined" size="medium" className="btn-orange-outline" >Cancel</Button>
                    </Grid>
                    <Grid item xs={1.5}>
                        <Button style={{ padding: "6px 0px" }} variant="contained" size="medium" className="btn-orange" onClick={handelSaveProceed}>Save & Proceed</Button>
                    </Grid>
                </Grid>
            </Box>
            <CustomizedDialogs open={showDialog} onClose={handleOnClose} titleText="Collection Boy - Area Binding">
                <CollectionBoyAreaBindingForm onClose={handleOnClose} onSave={handelSaveProceed} />
            </CustomizedDialogs>

        </div>

    )
}

export default AddFinancialInfoForm

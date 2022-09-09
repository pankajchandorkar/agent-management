import React,{useState} from 'react'
import { Grid, Box, Button } from '@mui/material';
import TextBox from '../common/TextBox';
import PaymentTypeAutocomplete from "../formik-form-components/PaymentTypeAutocomplete";
import CommissionTypeAutocomplete from "../formik-form-components/CommissionTypeAutocomplete";
import Radio from '@mui/material/Radio';


function AddFinancialInfoForm() {

    const [commInputLabel,setCommInputLabel] = useState("Amount");

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

    const [selectedValue, setSelectedValue] = React.useState('a');

    const handleChange = (event) => {
        let newVal = event.target.value;
        let newLabel = newVal ==="P"?"Enter Percentage":"Enter Amount";
        setSelectedValue(newVal);
        setCommInputLabel(newLabel);
    };

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
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1.4 }}>
                    <Grid className="agentCode" item xs={7} sm={6} md={6} >
                        <Box sx={{ display: 'flex' }}>
                            <TextBox label="GSTIN" name="gstin" />
                            <Box className="verified">
                                <img src="./images/verified-user.svg" alt="verified user" style={{ paddingLeft: '5px' }} />
                                &nbsp;Verified
                            </Box>
                        </Box>
                    </Grid>
                    <Grid className="agentCode" item xs={7} sm={6} md={6} >
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
                    <Grid className="agentCode" item xs={7} sm={6} md={2} >
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
                    <Grid sx={{ borderRight: "solid 1px #CCCCCC" }} item xs={7} sm={6} md={1.7} >
                        <Box sx={{ padding: "10px 10px 10px 0px" }}>
                            <PaymentTypeAutocomplete
                                {...getFilterPaymentTypeProps()}
                                onSelect={handlePaymentTypeChanged}
                                onRemove={handlePaymentTypeChanged} />
                        </Box>
                    </Grid>
                    <Grid sx={{ borderRight: "solid 1px #CCCCCC" }} item xs={7} sm={6} md={5.2} >
                        <Box sx={{ padding: "10px 10px 10px 10px", display: "flex",alignItems:"center" }}>
                            <CommissionTypeAutocomplete
                                {...getFilterCommissionTypeProps()}
                                onSelect={handleCommissionTypeChanged}
                                onRemove={handleCommissionTypeChanged} />
                            <Radio
                                checked={selectedValue === 'A'}
                                onChange={handleChange}
                                value="A"
                                name="rdoCommType"
                                id="rdoCommType-A"
                            />
                            <label for="rdoCommType-A">Amount</label>
                            <Radio
                                checked={selectedValue === 'P'}
                                onChange={handleChange}
                                value="P"
                                name="rdoCommType"
                                id="rdoCommType-P"
                            />
                            <label for="rdoCommType-P">Percentage</label>
                            <Box sx={{width:"150px"}}>
                            <TextBox label={commInputLabel} name="commval" />
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={7} sm={6} md={5} >
                        <Box>ddsfsfs</Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default AddFinancialInfoForm

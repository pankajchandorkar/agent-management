import React, { useState, useRef } from 'react'
import { Grid, Box, Button } from '@mui/material';
import Checkbox from "@mui/material/Checkbox";
import Radio from '@mui/material/Radio';
import BookRightsAutocomplete from '../../formik-form-components/BookRightsAutocomplete';
import CancelRightsAutocomplete from '../../formik-form-components/CancelRightsAutocomplete';
import ModifyRightsAutocomplete from '../../formik-form-components/ModifyRightsAutocomplete';
import FareChangeTypeAutocomplete from '../../formik-form-components/FareChangeTypeAutocomplete';
import TextBox from '../../common/TextBox';
import SwitchControl from '../../common/SwitchControl';
import { useEffect } from 'react';
import { ConstructionOutlined, TroubleshootOutlined } from '@mui/icons-material';

function AddPoliciesRights() {

  const refLimitFareCharge = useRef(null);
  const refLowerCancelPolicyFeeChange = useRef(null);

  const [bookRightsText, setBookRightsText] = useState("Both");
  const [bookRightsId, setBookRightsId] = useState("-1");

  const [cancelRightsText, setCancelRightsText] = useState("Both");
  const [cancelRightsId, setCancelRightsId] = useState("-1");

  const [modifyRightsText, setModifyRightsText] = useState("Both");
  const [modifyRightsId, setModifyRightsId] = useState("-1");

  const [allowedAutoCancel, setAllowedAutoCancel] = useState(false);

  const [rdoFeeCharges, setRdoFeeCharges] = useState('P');
  const [rdoBookingVisibility, setRdoBookingVisibility] = useState('1');
  const [rdoOutstandingSms, setRdoOutstandingSms] = useState('T');

  const [allowedFareChange, setAllowedFareChange] = useState(false);
  const [disabledFareChange, setDisabledFareChange] = useState(true);
  const [disabledFareChangeType, setDisabledFareChangeType] = useState(true);

  const [limitFareChangeAmt, setLimitFareChangeAmt] = useState(0);
  const [limitFareChangeType, setLimitFareChangeType] = useState(1);

  const [allowedLowerCancelPolicy, setAllowedLowerCancelPolicy] = useState(false);
  const [disabledLowerCancelPolicyFeeChange, setDisabledLowerCancelPolicyFeeChange] = useState(true);

  //for booking rights
  const getBookRightsProps = () => {
    return {
      id: 'acbookRights',
      label: 'Book Rights',
      searchPlaceholder: "Search By Book Rights",
      sx: { width: 200 },
      allOption: true,
      isCompulsory: false,
      singleSelect: true,
      canSearch: false,
      selectedValues: [-1]
    }
  }

  //for cancel rights
  const getCancelRightsProps = () => {
    return {
      id: 'accancelRights',
      label: 'Cancel Rights',
      searchPlaceholder: "Search By Cancel Rights",
      sx: { width: 200 },
      allOption: true,
      isCompulsory: false,
      singleSelect: true,
      canSearch: false,
      selectedValues: [-1]
    }
  }

  //for modify rights
  const getModifyRightsProps = () => {
    return {
      id: 'acmodifyRights',
      label: 'Modify Rights',
      searchPlaceholder: "Search By Modify Rights",
      sx: { width: 200 },
      allOption: true,
      isCompulsory: false,
      singleSelect: true,
      canSearch: false,
      selectedValues: [-1]
    }
  }

  //for fare change type
  const getFareChangeTypeProps = () => {
    return {
      id: 'acfareChangeType',
      label: 'Fare Change Type',
      searchPlaceholder: "Search By Fare Change Type",
      sx: { width: 200 },
      allOption: false,
      isCompulsory: false,
      singleSelect: true,
      canSearch: false,
      selectedValues: [1]
    }
  }

  const handleBookRightsChanged = (selectedBookRights) => {
    if (selectedBookRights.length > 0) {
      setBookRightsText(selectedBookRights[0].value);
      setBookRightsId(selectedBookRights[0].id);
    } else {
      setBookRightsText("Both");
      setBookRightsId("-1");
    }
  }

  const handleCancelRightsChanged = (selectedCancelRights) => {
    if (selectedCancelRights.length > 0) {
      setCancelRightsText(selectedCancelRights[0].value);
      setCancelRightsId(selectedCancelRights[0].id);
    } else {
      setCancelRightsText("Both");
      setCancelRightsId("-1");
    }
  }

  const handleModifyRightsChanged = (selectedModifyRights) => {
    if (selectedModifyRights.length > 0) {
      setModifyRightsText(selectedModifyRights[0].value);
      setModifyRightsId(selectedModifyRights[0].id);
    } else {
      setModifyRightsText("Both");
      setModifyRightsId("-1");
    }
  }

  const handleFareChangeTypeChanged = (selectedFareChangeType) => {
    if (selectedFareChangeType.length > 0) {
      setLimitFareChangeType(selectedFareChangeType[0].id);
    } else {
      setLimitFareChangeType(1);
    }
  }



  const handleFeeChargesChange = (event) => {
    setRdoFeeCharges(event.target.value);
  };

  const handleBookingVisibilityChange = (event) => {
    setRdoBookingVisibility(event.target.value);
  }

  const handleOutstandingSmsChange = (event) => {
    setRdoOutstandingSms(event.target.value);
  }

  const handelOnChangeLimitFareCharge = (e, newVal) => {
    if (limitFareChangeType === 1) {
      if (newVal > -1 && newVal < 101) {
        setLimitFareChangeAmt(newVal);
      } else {
        setLimitFareChangeAmt("");
      }
    } else {
      setLimitFareChangeAmt(newVal);
    }
  }

  useEffect(() => {
    if (allowedFareChange) {
      setDisabledFareChange(false);
      setDisabledFareChangeType(false);
      setTimeout(() => {
        refLimitFareCharge.current.focus();
      }, 0);
    } else {
      setDisabledFareChange(true);
      setDisabledFareChangeType(true);
    }
  }, [allowedFareChange]);

  useEffect(() => {
    if (allowedLowerCancelPolicy) {
      setDisabledLowerCancelPolicyFeeChange(false);
      setTimeout(() => {
        refLowerCancelPolicyFeeChange.current.focus();
      }, 0);
    } else {
      setDisabledLowerCancelPolicyFeeChange(true);
    }
  }, [allowedLowerCancelPolicy]);

  return (
    <div className='addPoliciesAndRightsForm'>
      <Box sx={{ padding: "12px 0px" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1.4 }}>
          <Grid className="tabHeading" item xs={7} sm={6} md={3} >
            Policies & Rights
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ padding: "5px 0 15px" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
          <Grid className="agentCode" item xs={7} sm={4} md={1.8} >
            <Box sx={{ padding: "8px 0px 8px 0px" }}>
              <BookRightsAutocomplete
                {...getBookRightsProps()}
                onSelect={handleBookRightsChanged}
                onRemove={handleBookRightsChanged} />
            </Box>
          </Grid>
          <Grid className="agentCode" item xs={7} sm={4} md={1.8}>
            <Box sx={{ padding: "8px 0px 8px 0px" }}>
              <CancelRightsAutocomplete
                {...getCancelRightsProps()}
                onSelect={handleCancelRightsChanged}
                onRemove={handleCancelRightsChanged} />
            </Box>
          </Grid>
          <Grid className="agentCode" item xs={7} sm={4} md={1.8} >
            <Box sx={{ padding: "8px 0px 8px 0px" }}>
              <ModifyRightsAutocomplete
                {...getModifyRightsProps()}
                onSelect={handleModifyRightsChanged}
                onRemove={handleModifyRightsChanged} />
            </Box>
          </Grid>
          <Grid className="agentCode" item xs={7} sm={2.2} md={1.5} >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SwitchControl label="Allow Auto Cancel" setCheck={allowedAutoCancel} handelOnChange={(checked) => setAllowedAutoCancel(checked)} />
            </Box>
          </Grid>
          <Grid className="agentCode" item xs={7} sm={1.8} md={1.5} >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SwitchControl label="Fare Change" setCheck={allowedFareChange} handelOnChange={(checked) => setAllowedFareChange(checked)} />
            </Box>
          </Grid>
          <Grid item xs={7} sm={4} md={1.8} >
            <Box sx={{ padding: "8px 0px 8px 0px" }}>
              <TextBox
                type="number"
                label="Limit Fare Change"
                textBoxRef={refLimitFareCharge}
                name="limitFareChange"
                disabled={disabledFareChange}
                value={limitFareChangeAmt}
                handleOnChange={handelOnChangeLimitFareCharge}
              />
            </Box>
          </Grid>
          <Grid item xs={7} sm={4} md={1.8} >
            <Box sx={{ padding: "8px 0px 8px 0px" }}>
              <FareChangeTypeAutocomplete
                {...getFareChangeTypeProps()}
                disabled={disabledFareChangeType}
                onSelect={handleFareChangeTypeChanged}
                onRemove={handleFareChangeTypeChanged} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ padding: "12px 0px" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={7} sm={6} md={6} >
            <Box className="leftBox">
              <Grid container sx={{ borderBottom: "solid 1px #CCCCCC", padding: "7px 13px" }}>
                <Grid item md={2.5} className="heading1">
                  <Box sx={{ padding: "13px 0px 14px 0px" }}>
                    Cancellation Policy
                  </Box>
                </Grid>
                <Grid item md={3.8}>
                  <Box sx={{ padding: "3px 0px 3px 0px", display: "flex", alignItems: "center" }}>
                    <SwitchControl
                      labelPlacement="start"
                      label="Lower cancel policy"
                      setCheck={allowedLowerCancelPolicy}
                      handelOnChange={(checked) => setAllowedLowerCancelPolicy(checked)}
                    />
                  </Box>
                </Grid>
                <Grid item md={5.7}>
                  <Box sx={{ padding: "1px 0px 1px 0px" }}>
                    <TextBox
                      type="number"
                      label="Lower Canc. Policy Fee Charges"
                      rssign={true}
                      name="feeCharges"
                      disabled={disabledLowerCancelPolicyFeeChange}
                      textBoxRef={refLowerCancelPolicyFeeChange}
                    />
                  </Box>
                </Grid>
              </Grid>
              <Grid container sx={{ borderBottom: "solid 1px #CCCCCC" }}>
                <Grid item md={12} sx={{ display: "flex", alignItems: "center", marginLeft: "-6px", padding: "7px 13px" }}>
                  <Radio
                    checked={rdoFeeCharges === 'P'}
                    onChange={handleFeeChargesChange}
                    value="P"
                    name="rdoFeeType"
                    id="rdoFeeType-P"
                    size="small"
                    className="rdoamount"
                  />
                  <label className="heading2" htmlFor="rdoFeeType-P">Percentage</label>
                  <Radio
                    checked={rdoFeeCharges === 'A'}
                    onChange={handleFeeChargesChange}
                    value="A"
                    name="rdoFeeType"
                    id="rdoFeeType-A"
                    size="small"
                    className="rdopercent"
                  />
                  <label className="heading2" htmlFor="rdoFeeType-A">Amount / Seat</label>
                </Grid>
              </Grid>
              <Grid container className="heading1" sx={{ borderBottom: "solid 1px #CCCCCC" }}>
                <Grid item md={4} sx={{ padding: "13px 13px" }}>
                  Within Minutes
                </Grid>
                <Grid item md={4} sx={{ padding: "13px 13px" }}>
                  Canc. Charges
                </Grid>
                <Grid item md={4} sx={{ padding: "13px 13px" }}>
                  Lower Canc. Policy
                </Grid>
              </Grid>
              <Box className="multipleTextBoxWrap">
                <Grid container sx={{ borderBottom: "solid 1px #CCCCCC" }}>
                  <Grid item md={4} sx={{ padding: "5px 13px" }}>
                    <TextBox name="feeCharges" />
                  </Grid>
                  <Grid item md={4} sx={{ padding: "5px 13px" }}>
                    <TextBox name="feeCharges" />
                  </Grid>
                  <Grid item md={4} sx={{ padding: "5px 13px" }}>
                    <TextBox
                      type="number"
                      disabled={disabledLowerCancelPolicyFeeChange}
                    />
                  </Grid>
                </Grid>
                <Grid container sx={{ borderBottom: "solid 1px #CCCCCC" }}>
                  <Grid item md={4} sx={{ padding: "5px 13px" }}>
                    <TextBox name="feeCharges" />
                  </Grid>
                  <Grid item md={4} sx={{ padding: "5px 13px" }}>
                    <TextBox name="feeCharges" />
                  </Grid>
                  <Grid item md={4} sx={{ padding: "5px 13px" }}>
                    <TextBox
                      type="number"
                      disabled={disabledLowerCancelPolicyFeeChange}
                    />
                  </Grid>
                </Grid>
                <Grid container sx={{ borderBottom: "solid 1px #CCCCCC" }}>
                  <Grid item md={4} sx={{ padding: "5px 13px" }}>
                    <TextBox name="feeCharges" />
                  </Grid>
                  <Grid item md={4} sx={{ padding: "5px 13px" }}>
                    <TextBox name="feeCharges" />
                  </Grid>
                  <Grid item md={4} sx={{ padding: "5px 13px" }}>
                    <TextBox
                      type="number"
                      disabled={disabledLowerCancelPolicyFeeChange}
                    />
                  </Grid>
                </Grid>
                <Grid container sx={{ borderBottom: "solid 1px #CCCCCC" }}>
                  <Grid item md={4} sx={{ padding: "5px 13px" }}>
                    <TextBox name="feeCharges" />
                  </Grid>
                  <Grid item md={4} sx={{ padding: "5px 13px" }}>
                    <TextBox name="feeCharges" />
                  </Grid>
                  <Grid item md={4} sx={{ padding: "5px 13px" }}>
                    <TextBox
                      type="number"
                      disabled={disabledLowerCancelPolicyFeeChange}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={4} sx={{ padding: "5px 13px" }}>
                    <TextBox name="feeCharges" />
                  </Grid>
                  <Grid item md={4} sx={{ padding: "5px 13px" }}>
                    <TextBox name="feeCharges" />
                  </Grid>
                  <Grid item md={4} sx={{ padding: "5px 13px" }}>
                    <TextBox
                      type="number"
                      disabled={disabledLowerCancelPolicyFeeChange}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={7} sm={6} md={6} >
            <Box className="rightBox">
              <Grid container sx={{ padding: "7px 15px" }}>
                <Grid item md={12} sx={{ paddingTop: "7px" }}>
                  <Box sx={{ padding: "3px 0px 3px 0px" }} className="heading1">
                    Booking Visibility in Book Bus Ticket:
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", marginLeft: "-20px", padding: "0px 0px 10px 13px" }}>
                    <Radio
                      checked={rdoBookingVisibility === '1'}
                      onChange={handleBookingVisibilityChange}
                      value="1"
                      name="rdoBookingVisibility"
                      id="rdoBookingVisibility-1"
                      size="small"
                      className="rdoamount"
                    />
                    <label className="heading2" htmlFor="rdoBookingVisibility-1">Own Booking</label>
                    <Radio
                      checked={rdoBookingVisibility === '2'}
                      onChange={handleBookingVisibilityChange}
                      value="2"
                      name="rdoBookingVisibility"
                      id="rdoBookingVisibility-2"
                      size="small"
                      className="rdopercent"
                    />
                    <label className="heading2" htmlFor="rdoBookingVisibility-2">Is Branch (restricted)</label>
                    <Radio
                      checked={rdoBookingVisibility === '3'}
                      onChange={handleBookingVisibilityChange}
                      value="3"
                      name="rdoBookingVisibility"
                      id="rdoBookingVisibility-3"
                      size="small"
                      className="rdopercent"
                    />
                    <label className="heading2" htmlFor="rdoBookingVisibility-3">Is Branch (all)</label>
                  </Box>
                </Grid>

                <Grid item md={12}>
                  <Box sx={{ padding: "3px 0px 3px 0px" }} className="heading1">
                    Outstanding SMS Communication:
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", marginLeft: "-20px", padding: "0px 0px 10px 13px" }}>
                    <Radio
                      checked={rdoOutstandingSms === 'T'}
                      onChange={handleOutstandingSmsChange}
                      value="T"
                      name="rdoOutstandingSms"
                      id="rdoOutstandingSms-T"
                      size="small"
                      className="rdoamount"
                    />
                    <label className="heading2" htmlFor="rdoOutstandingSms-T">Transaction</label>
                    <Radio
                      checked={rdoOutstandingSms === 'D'}
                      onChange={handleOutstandingSmsChange}
                      value="D"
                      name="rdoOutstandingSms"
                      id="rdoOutstandingSms-D"
                      size="small"
                      className="rdopercent"
                    />
                    <label className="heading2" htmlFor="rdoOutstandingSms-D">Daily</label>
                    <Radio
                      checked={rdoOutstandingSms === 'W'}
                      onChange={handleOutstandingSmsChange}
                      value="W"
                      name="rdoOutstandingSms"
                      id="rdoOutstandingSms-W"
                      size="small"
                      className="rdopercent"
                    />
                    <label className="heading2" htmlFor="rdoOutstandingSms-W">Weekly</label>
                    <Radio
                      checked={rdoOutstandingSms === 'M'}
                      onChange={handleOutstandingSmsChange}
                      value="M"
                      name="rdoOutstandingSms"
                      id="rdoOutstandingSms-M"
                      size="small"
                      className="rdoamount"
                    />
                    <label className="heading2" htmlFor="rdoOutstandingSms-M">Monthly</label>
                  </Box>
                </Grid>
                <Grid item md={12}>
                  <Box sx={{ height: "10px" }}>
                    &nbsp;
                  </Box>
                  <Box sx={{ padding: "3px 0px 3px 0px" }} className="heading1">
                    Summary of Rights:
                  </Box>
                  <Box sx={{ padding: "3px 0px 3px 0px" }}>
                    <span className="txtsummary">Booking - {bookRightsText}</span>
                    <span className="txtsummary">Cancel - {cancelRightsText}</span>
                    <span className="txtsummary">Modify - {modifyRightsText}</span>
                    <span className="txtsummary">Auto cancel - {allowedAutoCancel ? "Allowed" : "Disallowed"}</span>
                    <span className="txtsummary">Fare change - {allowedFareChange ? "Allowed" : "Disallowed"}</span>
                    <span className="txtsummary">Lower Cancellation Policy - {allowedLowerCancelPolicy ? "Allowed" : "Disallowed"}</span>
                    <span className="txtsummary">Booking visibility -
                      {
                        rdoBookingVisibility === "1" ? " Own Booking" : rdoBookingVisibility === "2" ? " Is Branch (restricted)" : rdoBookingVisibility === "3" ? " Is Branch (all)" : ""
                      }
                    </span>
                    <span className="txtsummary">Outstanding SMS type -
                      {
                        rdoOutstandingSms === "T" ? " Transaction" : rdoOutstandingSms === "D" ? " Daily" : rdoOutstandingSms === "W" ? " Weekly" : rdoOutstandingSms === "M" ? " Monthly" : ""
                      }
                    </span>
                  </Box>
                  <Box sx={{ height: "100px" }}>
                    &nbsp;
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ padding: "12px 0px", marginBottom: "25px" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
          <Grid item xs={9.5}>
            &nbsp;
          </Grid>
          <Grid item xs={1}>
            <Button variant="outlined" size="medium" className="btn-orange-outline" >Cancel</Button>
          </Grid>
          <Grid item xs={1.5}>
            <Button style={{ padding: "6px 0px" }} variant="contained" size="medium" className="btn-orange" >Save & Proceed</Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default AddPoliciesRights;

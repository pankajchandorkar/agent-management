import React, { useState, useEffect, useRef } from 'react'

import { Grid, Button, Link } from '@mui/material';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

import CountryAutocomplete from '../formik-form-components/CountryAutocomplete';
import StateAutocomplete from '../formik-form-components/StateAutocomplete';
import CityAutocomplete from '../formik-form-components/CityAutocomplete';
import StatusAutocomplete from "../formik-form-components/StatusAutocomplete";

import AgentNameAutocomplete from "../formik-form-components/AgentNameAutocomplete";
import AgentCodeAutocomplete from "../formik-form-components/AgentCodeAutocomplete";
import AgentMobileAutocomplete from "../formik-form-components/AgentMobileAutocomplete";
import AgentEmailAutocomplete from "../formik-form-components/AgentEmailAutocomplete";
import AgentTypeAutocomplete from "../formik-form-components/AgentTypeAutocomplete";

import PaymentTypeAutocomplete from "../formik-form-components/PaymentTypeAutocomplete";
import CommissionTypeAutocomplete from "../formik-form-components/CommissionTypeAutocomplete";
import CreditLimitAutocomplete from "../formik-form-components/CreditLimitAutocomplete";
import IsBlacklistedAutocomplete from '../formik-form-components/IsBlacklistedAutocomplete';
import BookingVisiblityAutocomplete from '../formik-form-components/BookingVisiblityAutocomplete';
import OutstandingCreditAutocomplete from '../formik-form-components/OutstandingCreditAutocomplete';

function AgentFilter({ handelSearchBtnClick }) {

    const stateRef = useRef(null);
    const cityRef = useRef(null);

    let basicFilter = {
        countryName: 'India',
        countryId: 1,
        stateName: '',
        stateId: '',
        cityName: '',
        cityId: '',
        status: 'All',
        statusId: -1,
    };

    let advanceFilter = {
        agentId: '',
        agentName: '',
        agentCode: '',
        agentMobile: '',
        agentEmail: '',
        agentType: '',
        agentTypeId: '',
        paymentType: '',
        paymentTypeId: '',
        commType: '',
        commTypeId: '',
        creditLimit: '',
        creditLimitId: '',
        bookingVisiblity: '',
        bookingVisiblityId: '',
        isBlacklisted: '',
        isBlacklistedId: '',
        outstandingCredit: '',
        outstandingCreditId: '',
    };


    const [initiateState, setInitiateState] = useState(true);
    const [agentBasicFilters, setAgentBasicFilters] = useState(basicFilter);
    const [agentAdvanceFilters, setAgentAdvanceFilters] = useState(advanceFilter);

    const [toggleFilter, setToggleFilter] = useState(false);

    //for country
    const getCountryProps = () => {
        return {
            id: 'countryId',
            label: 'Country',
            name: 'countryId',
            searchPlaceholder: "Search By Country Name",
            noDataLabel: "No Country Found",
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
            selectedValues: [1],
        }
    }

    const onCountryChange = (selectedCountries) => {

        stateRef.current.resetAutocomplete();
        cityRef.current.resetAutocomplete();

        if (selectedCountries.length > 0) {
            setAgentBasicFilters((previousFilter) => ({ ...previousFilter, 'countryName': selectedCountries[0].countryName, 'countryId': selectedCountries[0].countryId }));
        } else {
            setAgentBasicFilters((previousFilter) => ({ ...previousFilter, 'countryName': '', 'countryId': '' }));
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

    const onStateChange = (selectedStates) => {
        cityRef.current.resetAutocomplete();
        if (selectedStates.length > 0) {
            setAgentBasicFilters((previousFilter) => ({ ...previousFilter, 'stateName': selectedStates[0].stateName, 'stateId': selectedStates[0].stateId }));
        } else {
            setAgentBasicFilters((previousFilter) => ({ ...previousFilter, 'stateName': '', 'stateId': '' }));
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
            selectedValues: [],
        }
    }

    const onCityChange = (selectedCities) => {
        if (selectedCities.length > 0) {
            setAgentBasicFilters((previousFilter) => ({ ...previousFilter, 'cityName': selectedCities[0].cityName, 'cityId': selectedCities[0].cityId }));
        } else {
            setAgentBasicFilters((previousFilter) => ({ ...previousFilter, 'cityName': '', 'cityId': '' }));
        }
    }

    //for status
    const getFilterStatusProps = () => {
        return {
            id: 'acstatus',
            label: 'Status',
            sx: { width: 200 },
            allOption: true,
            isCompulsory: false,
            singleSelect: true,
            canSearch: false,
            selectedValues: [-1]
        }
    }

    const handleStatusChanged = (status) => {
        if (status.length > 0) {
            setAgentBasicFilters(previousFilters => ({ ...previousFilters, status: status[0].label, statusId: status[0].id }));
        } else {
            setAgentBasicFilters(previousFilters => ({ ...previousFilters, status: '', statusId: '' }));
        }
    }

    //for agent name
    const getFilterAgentNameProps = () => {
        return {
            id: 'acagentName',
            label: 'Agent Name',
            searchPlaceholder: "Search By Agent Name",
            sx: { width: 200 },
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
            selectedValues: []
        }
    }

    const handleAgentNameChanged = (selectedAgentName) => {
        if (selectedAgentName.length > 0) {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, agentName: selectedAgentName[0].agentName, agentId: selectedAgentName[0].agentId }));
        } else {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, agentName: '', agentId: '' }));
        }
    }

    //for agent code
    const getFilterAgentCodeProps = () => {
        return {
            id: 'acagentCode',
            label: 'Agent Code',
            searchPlaceholder: "Search By Agent Code",
            sx: { width: 200 },
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
            selectedValues: []
        }
    }

    const handleAgentCodeChanged = (selectedAgentCode) => {
        if (selectedAgentCode.length > 0) {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, agentCode: selectedAgentCode[0].agentCode }));
        } else {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, agentCode: '' }));
        }
    }

    //for agent mobile
    const getFilterAgentMobileProps = () => {
        return {
            id: 'acagentMobile',
            label: 'Mobile Number',
            searchPlaceholder: "Search By Mobile Number",
            sx: { width: 200 },
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
            selectedValues: []
        }
    }

    const handleAgentMobileChanged = (selectedAgentMobile) => {
        if (selectedAgentMobile.length > 0) {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, agentMobile: selectedAgentMobile[0].agentMobile }));
        } else {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, agentMobile: '' }));
        }
    }

    //for agent email
    const getFilterAgentEmailProps = () => {
        return {
            id: 'acagentEmail',
            label: 'Email ID',
            searchPlaceholder: "Search By Email ID",
            sx: { width: 200 },
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
            selectedValues: []
        }
    }

    const handleAgentEmailChanged = (selectedAgentEmail) => {
        if (selectedAgentEmail.length > 0) {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, agentEmail: selectedAgentEmail[0].agentEmail }));
        } else {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, agentEmail: '' }));
        }
    }

    //for agent type
    const getFilterAgentTypeProps = () => {
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

    const handleAgentTypeChanged = (selectedAgentType) => {
        if (selectedAgentType.length > 0) {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, agentType: selectedAgentType[0].agentType, agentTypeId: selectedAgentType[0].agentTypeId }));
        } else {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, agentType: '', agentTypeId: '' }));
        }
    }


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

    const handlePaymentTypeChanged = (selectedPaymentType) => {
        if (selectedPaymentType.length > 0) {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, paymentType: selectedPaymentType[0].paymentType, paymentTypeId: selectedPaymentType[0].paymentTypeId }));
        } else {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, paymentType: '', paymentTypeId: '' }));
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

    const handleCommissionTypeChanged = (selectedCommissionType) => {
        if (selectedCommissionType.length > 0) {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, commType: selectedCommissionType[0].commType, commTypeId: selectedCommissionType[0].commTypeId }));
        } else {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, commType: '', commTypeId: '' }));
        }
    }

    //for credit limit
    const getFilterCreditLimitProps = () => {
        return {
            id: 'accreditLimit',
            label: 'Credit Limit',
            searchPlaceholder: "Search By Credit Limit",
            sx: { width: 200 },
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
            canSearch: false,
            selectedValues: [-1]
        }
    }

    const handleCreditLimitChanged = (selectedCreditLimit) => {
        if (selectedCreditLimit.length > 0) {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, creditLimit: selectedCreditLimit[0].label, creditLimitId: selectedCreditLimit[0].id }));
        } else {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, creditLimit: '', creditLimitId: '' }));
        }
    }


    //for booking visiblity
    const getFilterBookingVisiblityProps = () => {
        return {
            id: 'acbookingVisiblity',
            label: 'Booking Visiblity',
            searchPlaceholder: "Search By Booking Visiblity",
            sx: { width: 200 },
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
            canSearch: false,
            selectedValues: [-1]
        }
    }

    const handleBookingVisiblityChanged = (selectedBookingVisiblity) => {
        if (selectedBookingVisiblity.length > 0) {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, bookingVisiblity: selectedBookingVisiblity[0].label, bookingVisiblityId: selectedBookingVisiblity[0].id }));
        } else {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, bookingVisiblity: '', bookingVisiblityId: '' }));
        }
    }

    //for is blacklisted
    const getFilterIsBlacklistedProps = () => {
        return {
            id: 'acisBlacklisted',
            label: 'Is Blacklisted',
            searchPlaceholder: "Search By Is Blacklisted",
            sx: { width: 200 },
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
            canSearch: false,
            selectedValues: [-1]
        }
    }

    const handleIsBlacklistedChanged = (selectedIsBlacklisted) => {
        if (selectedIsBlacklisted.length > 0) {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, isBlacklisted: selectedIsBlacklisted[0].label, isBlacklistedId: selectedIsBlacklisted[0].id }));
        } else {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, isBlacklisted: '', isBlacklistedId: '' }));
        }
    }

    //for outstanding credit
    const getFilterOutstandingCreditProps = () => {
        return {
            id: 'acoutstandingCredit',
            label: 'Outstanding Credit',
            searchPlaceholder: "Search By Outstanding Credit",
            sx: { width: 200 },
            allOption: false,
            isCompulsory: false,
            singleSelect: true,
            canSearch: false,
            selectedValues: [-1]
        }
    }

    const handleOutstandingCreditChanged = (selectedOutstandingCredit) => {
        if (selectedOutstandingCredit.length > 0) {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, outstandingCredit: selectedOutstandingCredit[0].label, outstandingCreditId: selectedOutstandingCredit[0].id }));
        } else {
            setAgentAdvanceFilters(previousFilters => ({ ...previousFilters, outstandingCredit: '', outstandingCreditId: '' }));
        }
    }

    //for toggle more filter
    const toggleMoreFilter = () => {
        //setAgentFilters(filters);
        setToggleFilter(!toggleFilter);
        //console.log('toggleMoreFilter', agentFilters);
    }

    const getAgentData = (flag) => {
        /* handelSearchBtnClick props sent from parent component */
        if (flag === 1) {
            handelSearchBtnClick({ ...agentBasicFilters });
        } else if (flag === 2) {
            handelSearchBtnClick({ ...agentBasicFilters, ...agentAdvanceFilters });
        }
    }

    const resetAgentFilter = () => {
        setInitiateState(false);
        setAgentAdvanceFilters(advanceFilter);
        setTimeout(() => {
            setInitiateState(true);
        }, 0);
    }

    return (
        <div className='agentFilter'>
            <div className='basicFilter'>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1.4 }}>
                    <Grid item xs={12} sm={4} md={2.6}>
                        <CountryAutocomplete
                            {...getCountryProps()}
                            onSelect={(selectedCountries) => { onCountryChange(selectedCountries) }}
                            onRemove={(selectedCountries) => { onCountryChange(selectedCountries) }} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={2.6}>
                        <StateAutocomplete
                            {...getStateProps()}
                            countryId={1}
                            ref={stateRef}
                            onSelect={(selectedStates) => { onStateChange(selectedStates) }}
                            onRemove={(selectedStates) => { onStateChange(selectedStates) }} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={2.6}>
                        <CityAutocomplete
                            {...getCityProps()}
                            stateId={1}
                            ref={cityRef}
                            onSelect={(selectedCities) => { onCityChange(selectedCities) }}
                            onRemove={(selectedCities) => { onCityChange(selectedCities) }} />
                    </Grid>
                    <Grid item xs={12} sm={4} md={2.6}>
                        <StatusAutocomplete
                            {...getFilterStatusProps()}
                            onSelect={handleStatusChanged}
                            onRemove={handleStatusChanged} />
                    </Grid>
                    <Grid item xs={6} sm={4} md={0.6}>
                        <Button variant="contained" size="medium" className="btn-orange" onClick={() => getAgentData(1)}>Go</Button>
                    </Grid>
                    <Grid item xs={6} sm={4} md={1} className="filterLinkWrap">
                        <Link href="#" rel="noopener" className="filterLink" onClick={toggleMoreFilter}>
                            {toggleFilter ? "Close Filters" : "More Filters"}
                            {toggleFilter ? <FontAwesomeIcon icon={faCaretUp} color={"#036ECE"} className="filterLinkIcon" /> : <FontAwesomeIcon icon={faCaretDown} color={"#036ECE"} className="filterLinkIcon" />}
                        </Link>
                    </Grid>
                </Grid>
            </div>
            {toggleFilter && initiateState &&
                <div className="advanceFilter">
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1.4 }}>
                        <Grid item xs={12} sm={4} md={2}>
                            <AgentNameAutocomplete
                                {...getFilterAgentNameProps()}
                                onSelect={handleAgentNameChanged}
                                onRemove={handleAgentNameChanged}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <AgentCodeAutocomplete
                                {...getFilterAgentCodeProps()}
                                onSelect={handleAgentCodeChanged}
                                onRemove={handleAgentCodeChanged} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <AgentMobileAutocomplete
                                {...getFilterAgentMobileProps()}
                                onSelect={handleAgentMobileChanged}
                                onRemove={handleAgentMobileChanged} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={2} className="agentEmail">
                            <AgentEmailAutocomplete
                                {...getFilterAgentEmailProps()}
                                onSelect={handleAgentEmailChanged}
                                onRemove={handleAgentEmailChanged} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <AgentTypeAutocomplete
                                {...getFilterAgentTypeProps()}
                                onSelect={handleAgentTypeChanged}
                                onRemove={handleAgentTypeChanged} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <PaymentTypeAutocomplete
                                {...getFilterPaymentTypeProps()}
                                onSelect={handlePaymentTypeChanged}
                                onRemove={handlePaymentTypeChanged} />
                        </Grid>
                    </Grid>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1.4 }} style={{ marginTop: '10px' }}>
                        <Grid item xs={12} sm={4} md={2}>
                            <CommissionTypeAutocomplete
                                {...getFilterCommissionTypeProps()}
                                onSelect={handleCommissionTypeChanged}
                                onRemove={handleCommissionTypeChanged} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <CreditLimitAutocomplete
                                {...getFilterCreditLimitProps()}
                                onSelect={handleCreditLimitChanged}
                                onRemove={handleCreditLimitChanged} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <BookingVisiblityAutocomplete
                                {...getFilterBookingVisiblityProps()}
                                onSelect={handleBookingVisiblityChanged}
                                onRemove={handleBookingVisiblityChanged} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <IsBlacklistedAutocomplete
                                {...getFilterIsBlacklistedProps()}
                                onSelect={handleIsBlacklistedChanged}
                                onRemove={handleIsBlacklistedChanged} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={2}>
                            <OutstandingCreditAutocomplete
                                {...getFilterOutstandingCreditProps()}
                                onSelect={handleOutstandingCreditChanged}
                                onRemove={handleOutstandingCreditChanged} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={1}>
                            <Button variant="contained" size="medium" className="btn-orange" onClick={() => getAgentData(2)}>Filter</Button>
                        </Grid>
                        <Grid item xs={12} sm={4} md={1}>
                            <Button variant="outlined" size="medium" className="btn-orange-outline" onClick={() => resetAgentFilter()}>Reset</Button>
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    )
}

export default AgentFilter

import React, { useState } from 'react'
import { styled } from "@mui/material/styles";

import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import { Box, Grid } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";

import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import Collapse from "@mui/material/Collapse";
import Link from "@mui/material/Link";
import Moment from "moment";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "#FFFFFF",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        // border: 0,
    },

    "& .tblCell": {
        borderRadius: "0px 40px 40px 0px",
        backgroundColor: "#DEF2F9",
        padding: "12px",
    },
}));


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#0086FF",
        color: "#fff",
        padding: "10px 16px",
        borderRight: "1px solid rgba(255, 255, 255, 0.1);",
        fontSize: "13px",
    },
    [`&.${tableCellClasses.head}:last-child`]: {
        borderRight: 0,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        color: "#444444",
        fontWeight: "600",
        borderRight: "0px solid #E8ECF0",
        borderBottom: "1px solid #E8ECF0",
        padding: "1px 16px",
        letterSpacing: "0.05em",
    },
    /* [`&.${tableCellClasses.body}:last-child`]: {
      borderRight: 0,
      borderBottom: 0,
    }, */
}));

function Row(props) {
    const { row, viewDetailFor, cellBgColor, handelAgentStatus, viewAgentDetails } = props;
    return (
        <React.Fragment>
            <StyledTableRow
                key={"agent-" + row.id}
                className={
                    viewDetailFor[row.id]
                        ? cellBgColor[row.mobile] === "bgBlue"
                            ? "bgBlueLight brdTop"
                            : "bgOrangeLight brdTop"
                        : ""
                }
            >
                <StyledTableCell style={{ width: "10%", padding: "0px" }}>
                    <Box className={`tblCell ${cellBgColor[row.mobile]}`}>
                        {row.mobile}
                    </Box>
                </StyledTableCell>

                <StyledTableCell style={{ width: "16%" }}>
                    {row.name}
                </StyledTableCell>

                <StyledTableCell style={{ width: "10%" }}>
                    {row.code}
                </StyledTableCell>

                <StyledTableCell style={{ width: "12%" }}>
                    {row.paymentType}
                </StyledTableCell>

                <StyledTableCell style={{ width: "14%" }}>
                    {row.state}
                </StyledTableCell>

                <StyledTableCell style={{ width: "14%" }}>
                    {row.city}
                </StyledTableCell>

                <StyledTableCell align="center" style={{ width: "8%" }}>
                    <Checkbox
                        checked={row.status === "Active" ? true : false}
                        onClick={() => handelAgentStatus(row)}
                    />
                </StyledTableCell>

                <StyledTableCell
                    style={{ width: "16%", color: "#0086FF" }}
                >
                    <IconButton onClick={() => viewAgentDetails(row.id)}>
                        {viewDetailFor[row.id] ? (
                            <RemoveIcon style={{ color: "#0086FF" }} />
                        ) : (
                            <AddIcon style={{ color: "#0086FF" }} />
                        )}
                    </IconButton>
                    More Details /{" "}
                    <Link
                        href="#"
                        color="inherit"
                        underline="none"
                        style={{ marginLeft: "5px" }}
                        rel="noreferrer"
                    >
                        Edit
                    </Link>
                </StyledTableCell>
            </StyledTableRow>
            {viewDetailFor[row.id] && (
                <StyledTableRow
                    key={"agent-detail-" + row.id}
                    className={
                        viewDetailFor[row.id]
                            ? cellBgColor[row.mobile] === "bgBlue"
                                ? "bgBlueLight brdBottom"
                                : "bgOrangeLight brdBottom"
                            : ""
                    }
                >
                    <StyledTableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                    ></StyledTableCell>
                    <StyledTableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={7}
                    >
                        <Collapse
                            in={viewDetailFor[row.id]}
                            timeout="auto"
                            unmountOnExit
                        >
                            <Grid
                                container
                                rowSpacing={{ md: 0, sm: 1 }}
                                columnSpacing={{ xs: 1 }}
                                className="agentDetailsWrap"
                            >
                                <Grid item sm={3} md={1.6} className="vline pr">
                                    <Box className="heading">Email</Box>
                                    <Box className="value">{row.email}</Box>
                                </Grid>
                                <Grid item sm={3} md={1.4} className="vline pr">
                                    <Box className="heading">Comm Type</Box>
                                    <Box className="value">{row.commType}</Box>
                                </Grid>
                                <Grid item sm={3} md={1.3} className="vline pr">
                                    <Box className="heading">
                                        Booking Visibility
                                    </Box>
                                    <Box className="value">
                                        {row.bookingVisiblity}
                                    </Box>
                                </Grid>
                                <Grid item sm={3} md={1.2} className="vline pr">
                                    <Box className="heading">Payment Type</Box>
                                    <Box className="value">{row.paymentType}</Box>
                                </Grid>
                                <Grid item sm={3} md={1.5} className="vline pr">
                                    <Box className="heading">GSTIN</Box>
                                    <Box className="value">{row.gstin}</Box>
                                </Grid>
                                <Grid item sm={3} md={1.1} className="vline pr">
                                    <Box className="heading">Pan</Box>
                                    <Box className="value">{row.panno}</Box>
                                </Grid>
                                <Grid item sm={3} md={1.3} className="vline pr">
                                    <Box className="heading">Prepaid Balance</Box>
                                    <Box className="value">{row.balance}</Box>
                                </Grid>
                                <Grid item sm={3} md={1.4} className="vline pr">
                                    <Box className="heading">
                                        Outstanding Credit
                                    </Box>
                                    <Box className="value">{row.credit}</Box>
                                </Grid>
                                <Grid item sm={4} md={1.2}>
                                    <Box className="heading">Created On</Box>
                                    <Box className="value">
                                        {Moment(row.createdDt).format("Do MMM YYYY")}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Collapse>
                    </StyledTableCell>
                </StyledTableRow>
            )}
        </React.Fragment>
    )
}

function AgentTableBody(props) {

    const { rowsPerPage, tableData, page, cellBgColor, handelAgentStatus } = props;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

    const [viewDetailFor, setViewDetailFor] = useState({});

    const viewAgentDetails = (agentId) => {
        const temp = { ...viewDetailFor };
        temp[agentId] = temp[agentId] ? !temp[agentId] : true;
        setViewDetailFor(temp);
    };

    return (
        <TableBody>
            {
                (
                    rowsPerPage > 0
                        ? tableData.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        : tableData
                ).map(
                    (row, index) => (
                        <Row
                            key={index}
                            row={row}
                            viewDetailFor={viewDetailFor}
                            cellBgColor={cellBgColor}
                            handelAgentStatus={handelAgentStatus}
                            viewAgentDetails={viewAgentDetails}
                        />
                    )
                )
            }

            {tableData.length === 0 && (
                <StyledTableRow style={{ height: 100 }}>
                    <StyledTableCell colSpan={10} align="center">
                        No Records Found
                    </StyledTableCell>
                </StyledTableRow>
            )}
            {emptyRows > 0 && (
                <StyledTableRow key="empty-row" style={{ height: 53 * emptyRows }}>
                    <StyledTableCell colSpan={10} />
                </StyledTableRow>
            )}
        </TableBody>
    )
}

export default AgentTableBody

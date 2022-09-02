import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretUp,
    faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme, styled } from "@mui/material/styles";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

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

function AgentTableHead(props) {

    const {handleSorting, tableData } = props;

    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("mobile");

    const tblHeadCol = [
        { headerName: 'Mobile No.', field: 'mobile', headerSx: { borderTopLeftRadius: "2px" }, allowSorting: true },
        { headerName: 'Agent Name', field: 'name', allowSorting: true },
        { headerName: 'Agent Code', field: 'code', allowSorting: true },
        { headerName: 'Payment Type', field: 'paymentType', allowSorting: true },
        { headerName: 'State', field: 'state', allowSorting: true },
        { headerName: 'City', field: 'city', allowSorting: true },
        { headerName: 'Active', field: 'status', allowSorting: true },
        { headerName: 'Details', field: '', headerSx: { borderTopRightRadius: "2px" }, allowSorting: false },
    ];

    const sortTableData = (e, field, sortOrder) => {
        e.stopPropagation();
        let data = [...tableData];
        setOrder(sortOrder);
        setOrderBy(field);
        let sortedData = data.sort((a, b) => {
            if (sortOrder === 'asc') {
                if (typeof a[field] === 'number') {
                    if (a[field] > b[field]) {
                        return 1;
                    } else if (a[field] < b[field]) {
                        return -1;
                    } else {
                        return 0;
                    }
                } else {
                    return a[field].localeCompare(b[field]);
                }
            } else {
                if (typeof a[field] === 'number') {
                    if (b[field] > a[field]) {
                        return 1;
                    } else if (b[field] < a[field]) {
                        return -1;
                    } else {
                        return 0;
                    }
                } else {
                    return b[field].localeCompare(a[field]);
                }
            }
        });

        handleSorting(sortedData);
    }

    return (
        <TableHead>
            <TableRow>
                {tblHeadCol && tblHeadCol.map((col) => (
                    <StyledTableCell
                        style={col.headerSx}
                        key={`th-col-${col.field}`}
                    >
                        <span>{col.headerName}</span>
                        {col.allowSorting && (
                            <span>
                                <span
                                    className={`up ${(orderBy === col.field && order === 'asc') ? 'active' : ''}`}
                                    onClick={(e) => sortTableData(e, col.field, "asc")}
                                >
                                    <FontAwesomeIcon icon={faCaretUp} transform="shrink-2" />
                                </span>
                                <span
                                    className={`down ${(orderBy === col.field && order === 'desc') ? 'active' : ''}`}
                                    onClick={(e) => sortTableData(e, col.field, "desc")}
                                >
                                    <FontAwesomeIcon icon={faCaretDown} transform="shrink-2" />
                                </span>
                            </span>
                        )}
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default AgentTableHead;

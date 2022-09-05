import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import api from "../../api/api";

import { Paper } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import AgentTableHead from "./AgentTableHead";
import AgentTableBody from "./AgentTableBody"
import AgentTablePagination from "./AgentTablePagination";
import ExportToExcel from "../common/ExportToExcel";
import ConfirmationDialogRaw from "../common/ConfirmationDialogRaw";

const columns = [
  { header: 'Mobile No.', key: 'mobile', align: 'center' },
  { header: 'Agent Name', key: 'name', align: 'left' },
  { header: 'Agent Code', key: 'code', align: 'left' },
  { header: 'Payment Type', key: 'paymentType', align: 'left' },
  { header: 'State', key: 'state', align: 'left' },
  { header: 'City', key: 'city', align: 'left' },
  { header: 'Status', key: 'status', align: 'left' },
  { header: 'Email', key: 'email', align: 'left' },
  { header: 'Commission Type', key: 'commType', align: 'left' },
  { header: 'Booking Visibility', key: 'bookingVisiblity', align: 'left' },
  { header: 'GSTIN', key: 'gstin', align: 'left' },
  { header: 'PAN No.', key: 'panno', align: 'left' },
  { header: 'Prepaid Balance', key: 'balance', align: 'right' },
  { header: 'Outstanding Credit', key: 'credit', align: 'right' },
  { header: 'Created On', key: 'createdDt', align: 'right' },
]

let initialAgentResultData = [];

const AgentResult = ({ agentResult }) => {

  const sortedAgentData = agentResult.sort((a, b) => a.mobile - b.mobile);
  initialAgentResultData = sortedAgentData;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState(sortedAgentData);
  const [searchText, setSearchText] = useState("");
  const [cellBgColor, setCellBgColor] = useState([]);

  //for agent status manage
  const [agentToggleStatusId, setAgentToggleStatusId] = useState(null);
  const [agentToggleStatus, setAgentToggleStatus] = useState(false);
  const [agentToggleStatusMessage, setAgentToggleStatusMessage] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filterRowsData = () => {
    let data = [...initialAgentResultData];
    let val = searchText;
    if (val === "") {
      setTableData(initialAgentResultData);
    } else {
      let filterData = data.filter(
        (item) =>
          item.mobile.toLocaleLowerCase().includes(val) ||
          item.name.toLocaleLowerCase().includes(val) ||
          item.code.toLocaleLowerCase().includes(val) ||
          item.paymentType.toLocaleLowerCase().includes(val) ||
          item.state.toLocaleLowerCase().includes(val) ||
          item.city.toLocaleLowerCase().includes(val) ||
          item.status.toLocaleLowerCase().includes(val)
      );
      setTableData(filterData);
    }
  };

  const handleSorting = (sortedData) => {
    setTableData(sortedData);
  }

  useEffect(() => {
    filterRowsData();
  }, [searchText]);

  useEffect(() => {
    let tmpArr = [...new Set(tableData.map((item) => item.mobile))];

    let toggleClass = false;
    let tmpClassArr = [];

    setCellBgColor(tmpClassArr);

    tmpArr.map((d, i) => {
      tmpClassArr[d] = toggleClass ? "bgOrange" : "bgBlue";
      toggleClass = !toggleClass;
    });

    setCellBgColor(tmpClassArr);
  }, [tableData]);


  const toggleAgentStatus = async (confirmation) => {
    setAgentToggleStatus(false);

    if (confirmation && agentToggleStatusId) {
      // Process Toggle Agent Status

      let agentRows = [...tableData];
      let agentStatusRows = agentRows.filter((row, index) => row.id === agentToggleStatusId)[0];
      let newStatus = agentStatusRows.status === "Active" ? "Inactive" : "Active";

      const response = await api.put("/agents/" + agentToggleStatusId, {
        ...agentStatusRows, status: newStatus
      });

      setTableData(agentRows.map((row, index) => {
        if (row.id === agentToggleStatusId) {
          return response.data;
        } else {
          return row;
        }
      }));

      setAgentToggleStatusId(null);
    }
  };

  const handelAgentStatus = (forAgentRow) => {

    setAgentToggleStatusId(forAgentRow.id);

    let message = (
      <div className="agentDialogWrap">
        <div className="agentSvg">
          <img
            src={
              forAgentRow.status === "Active"
                ? "/images/deactivate.svg"
                : "/images/activate.svg"
            }
            width="60"
            height="60"
          />
        </div>
        <div className="agentMessage">
          {forAgentRow.status === "Active"
            ? "You are Removing Agent:"
            : "You are Adding Agent:"}
        </div>
        <div className="agentName">{forAgentRow.name}</div>
      </div>
    );

    setAgentToggleStatusMessage(message);
    setAgentToggleStatus(true);
  };

  return (
    <div className="agentResultContainer">
      <div className="agentSearchAndExportContainer">
        <div className="agentSearchInputWrap">
          <input
            type="text"
            placeholder="Search for agents by mobile, name, city, state, status"
            className="agentSearchInput"
            onChange={(e) => setSearchText(e.target.value.toLocaleLowerCase())}
            value={searchText}
          />
          <div className="agentSearchIcon">
            <FontAwesomeIcon color="#777" icon={faMagnifyingGlass} />
          </div>
          {searchText.length > 0 && (
            <div
              className="agentSearchCrossIcon"
              onClick={() => setSearchText("")}
            >
              <FontAwesomeIcon icon={faXmark} color={"#777"} />
            </div>
          )}

        </div>
        {tableData.length > 0 && (
          <div className="agentExportButton">
            <ExportToExcel fileName="AgentManagement" sheetName="Agents" columns={columns} data={tableData} />
          </div>
        )}
      </div>
      <div className="agentDataContainer">
        <TableContainer component={Paper} style={{ overflowX: "unset", borderRadius: "6px" }}>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <AgentTableHead handleSorting={handleSorting} tableData={tableData} />
            <AgentTableBody rowsPerPage={rowsPerPage} tableData={tableData} page={page} cellBgColor={cellBgColor} handelAgentStatus={handelAgentStatus} />
          </Table>
        </TableContainer>
        <AgentTablePagination totRowCount={tableData.length} rowsPerPage={rowsPerPage} page={page} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
      </div>
      <ConfirmationDialogRaw id="agent-toggle-status-confirmation" keepMounted open={agentToggleStatus} onClose={toggleAgentStatus} dialogConfirmationMessage={agentToggleStatusMessage} showTitle={false} />
    </div>
  );
};

export default AgentResult;
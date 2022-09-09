import React, { useState } from "react";
import { Grid } from '@mui/material';

import "../../style/agent.scss";
import ViewAgents from "./ViewAgents";
import AddAgents from "./AddAgents";
import AddPersonalAgents from "./AddPersonalAgents";

function Agent() {

  const [tab, setTab] = useState("viewAgent");

  return (
    <div className="agent_management_container">
      <div className="agent_tabs_wrapper">
        <Grid container>
          <Grid item xs={12} sm={4} md={1.5} >
            <div
              className={"agent_tab " + (tab === "viewAgent" ? "active" : "")}
              onClick={() => setTab("viewAgent")}
            >
              VIEW / EDIT AGENTS
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={1.1} >
            <div
              className={"agent_tab " + (tab === "addAgent" ? "active" : "")}
              onClick={() => setTab("addAgent")}
            >
              ADD AGENTS
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={1.7} >
            <div
              className={"agent_tab " + (tab === "addPersonalAgent" ? "active" : "")}
              onClick={() => setTab("addPersonalAgent")}
            >
              ADD PERSONAL AGENTS
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={1.6} >
            <div
              className={"agent_tab " + (tab === "voucher" ? "active" : "")}
              onClick={() => setTab("voucher")}
            >
              VIEW & SEND VOUCHER
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={2} >
            <div
              className={"agent_tab " + (tab === "recharge" ? "active" : "")}
              onClick={() => setTab("recharge")}
            >
              RECHARGE PREPAID AGENTS
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={0.7} >
            <div
              className={"agent_tab " + (tab === "report" ? "active" : "")}
              onClick={() => setTab("report")}
            >
              REPORTS
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={3.4} >
            &nbsp;
          </Grid>
        </Grid>
      </div>
      <div className="agent_tabs_content">
        {tab === "viewAgent" && (<ViewAgents />)}
        {tab === "addAgent" && (<AddAgents />)}
        {tab === "addPersonalAgent" && (<AddPersonalAgents />)}
        {tab === "voucher" && " VIEW & SEND VOUCHER"}
        {tab === "recharge" && "RECHARGE PREPAID AGENTS"}
        {tab === "report" && "REPORTS"}
      </div>
    </div>
  );
}

export default Agent;

import React, { useState } from "react";
import { Grid } from '@mui/material';

import "../../style/agent.scss";
import ViewAgents from "./ViewAgents";

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
              VIEW / ADD AGENTS
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={2.2} >
            <div
              className={"agent_tab " + (tab === "newAgent" ? "active" : "")}
              onClick={() => setTab("newAgent")}
            >
              CREATE NEW PERSONAL AGENT
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={1.7} >
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
          <Grid item xs={12} sm={4} md={0.8} >
            <div
              className={"agent_tab " + (tab === "report" ? "active" : "")}
              onClick={() => setTab("report")}
            >
              REPORTS
            </div>
          </Grid>
          <Grid item xs={12} sm={4} md={3.8} >
            &nbsp;
          </Grid>
        </Grid>
      </div>
      <div className="agent_tabs_content">
        {tab === "viewAgent" && (<ViewAgents />)}
        {tab === "newAgent" && "CREATE NEW PERSONAL AGENT"}
        {tab === "voucher" && " VIEW & SEND VOUCHER"}
        {tab === "recharge" && "RECHARGE PREPAID AGENTS"}
        {tab === "report" && "REPORTS"}
      </div>
    </div>
  );
}

export default Agent;

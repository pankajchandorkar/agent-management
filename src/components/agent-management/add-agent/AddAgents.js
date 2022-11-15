import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import AddAgentDetailsForm from "./AddAgentDetailsForm";
import AddFinancialInfoForm from "./AddFinancialInfoForm";
import AddPoliciesRights from "./AddPoliciesRights";

import "../../../style/newAgents.scss";

function AddAgents() {

  const [agentFormActiveTab, setAgentFormActiveTab] = useState("AgentDetails");
  const [adTabDone, setAdTabDone] = useState(false);
  const [fiTabDone, setFiTabDone] = useState(false);
  const [prTabDone, setPrTabDone] = useState(false);

  useEffect(() => {
    console.log("add agents load");
  }, []);

  const manageFinancialInfoTab = () => {
    setAgentFormActiveTab("FinancialInfo");
    setAdTabDone("completed");
  }

  const managePoliciesRightsTab = () => {
    setAgentFormActiveTab("Policies");
    fiTabDone("completed");
  }

  return (
    <div className="addAgentContainer">
      <div className="agentFormTabWrap">
        <div
          className={`agentFormTab ${agentFormActiveTab === `AgentDetails` ? "active" : ""
            } ${adTabDone ? "completed" : ""
            }`}
        >
          {adTabDone && (<div className="agentFormTabLeft">
            <FontAwesomeIcon
              icon={faCheck}
              color="#20D341"
              style={{ fontSize: "20px" }}
            />
          </div>)}
          <div
            className="agentFormTabCenter"
            onClick={() => setAgentFormActiveTab("AgentDetails")}
          >
            1. Agent Details
          </div>
          <div className="agentFormTabRight">
            <FontAwesomeIcon
              icon={faChevronRight}
              color="#5C6A77"
              style={{ fontSize: "18px" }}
            />
          </div>
        </div>
        <div
          className={`agentFormTab ${agentFormActiveTab === `FinancialInfo` ? "active" : ""
            } ${fiTabDone ? "completed" : ""
            }`}
        >
          {fiTabDone && (<div className="agentFormTabLeft">
            <FontAwesomeIcon
              icon={faCheck}
              color="#20D341"
              style={{ fontSize: "20px" }}
            />
          </div>)}

          <div
            className="agentFormTabCenter"
            onClick={() => setAgentFormActiveTab("FinancialInfo")}
          >
            2. Financial Info Settings
          </div>
          <div className="agentFormTabRight">
            <FontAwesomeIcon
              icon={faChevronRight}
              color="#5C6A77"
              style={{ fontSize: "18px" }}
            />
          </div>
        </div>
        <div
          className={`agentFormTab ${agentFormActiveTab === `Policies` ? "active" : ""
            } ${prTabDone ? "completed" : ""
            }`}
        >
          {prTabDone && (<div className="agentFormTabLeft">
            <FontAwesomeIcon
              icon={faCheck}
              color="#20D341"
              style={{ fontSize: "20px" }}
            />
          </div>)}

          <div
            className="agentFormTabCenter"
            onClick={() => setAgentFormActiveTab("Policies")}
          >
            3. Policies & Rights
          </div>
        </div>
      </div>
      <div className="agentFormTabContentWrap">
        {agentFormActiveTab === "AgentDetails" && (<AddAgentDetailsForm manageFinancialInfoTab={manageFinancialInfoTab} />)}
        {agentFormActiveTab === "FinancialInfo" && (<AddFinancialInfoForm managePoliciesRightsTab={managePoliciesRightsTab} />)}
        {agentFormActiveTab === "Policies" && (<AddPoliciesRights />)}
      </div>
    </div>
  );
}

export default AddAgents;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateLoading } from '../../redux/actions';
import api from '../../api/api';
import AgentFilter from './AgentFilter';
import AgentResult from './AgentResult';

import '../../style/viewAgents.scss';

function ViewAgents() {

  const dispatch = useDispatch();
  const [agentResult, setAgentResult] = useState([]);

  const getAgentRecords = async (agentFilter) => {

    setAgentResult([]);
    dispatch(updateLoading(true));

    const response = await api.get("/agents", {
      params: agentFilter
    });

    if (response.data) {
      setAgentResult(response.data);
    }

    dispatch(updateLoading(false));
  }

  return (
    <div className='viewAgentContainer'>
      <AgentFilter handelSearchBtnClick={getAgentRecords} />
      {
        agentResult.length > 0 && (
          <AgentResult agentResult={agentResult} />
        )
      }
    </div>
  )
}

export default ViewAgents

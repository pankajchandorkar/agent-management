import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateLoading } from '../../../redux/actions';
import api from '../../../api/api';
import AgentFilter from './AgentFilter';
import AgentResult from './AgentResult';

import '../../../style/viewAgents.scss';

function ViewAgents() {

  const dispatch = useDispatch();
  const [agentResult, setAgentResult] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);


  const getAgentRecords = async (agentFilter) => {

    setAgentResult([]);
    setDataLoaded(false);
    dispatch(updateLoading(true));

    const response = await api.get("/agents", {
      params: agentFilter
    });

    if (response.data) {
      setAgentResult(response.data);
      setDataLoaded(true);
    }

    dispatch(updateLoading(false));
  }

  return (
    <div className='viewAgentContainer'>
      <AgentFilter handelSearchBtnClick={getAgentRecords} />
      {
        dataLoaded && (
          <AgentResult agentResult={agentResult} />
        )
      }
    </div>
  )
}

export default ViewAgents

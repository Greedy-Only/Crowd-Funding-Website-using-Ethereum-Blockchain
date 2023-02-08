import React, { useState, useEffect } from 'react'
import { DisplayRequests } from '../components';
import { useStateContext } from '../context'

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  const { address, contract, getRequests } = useStateContext();

  const fetchRequests = async () => {
    setIsLoading(true);
    const data = await getRequests();
    setRequests(data);
    setIsLoading(false);
  }
  useEffect(() => {
    if (contract) fetchRequests();
  }, [address, contract]);

  return (
    <DisplayRequests
      title="All Requests"
      isLoading={isLoading}
      requests={requests} />
  )
}

export default Home
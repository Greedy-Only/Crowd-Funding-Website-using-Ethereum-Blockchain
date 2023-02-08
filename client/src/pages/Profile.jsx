import React, { useState, useEffect } from 'react'
import { DisplayRequests } from '../components';
import { useStateContext } from '../context'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  const { address, contract, getUserRequests } = useStateContext();

  const fetchRequests = async () => {
    setIsLoading(true);
    const data = await getUserRequests();
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

export default Profile
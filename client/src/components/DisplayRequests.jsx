import React from 'react'
import { useNavigate } from 'react-router-dom';

import { loader } from '../assets';
import FundCard from './FundCard';

const DisplayRequests = ({ title, isLoading, requests }) => {

    const navigate = useNavigate();
    const handleNavigate = (request) => {
        navigate(`/campaign-details/${request.title}`, { state: request })
    }
    return (
        <div>
            <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({requests.length})</h1>
            <div className="flex flex-wrap mt-[20px] gap-[26px]">
                {isLoading && (
                    <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
                )}
                {!isLoading && requests.length === 0 && (<p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">You have not created any request yet.</p>
                )
                }
                {!isLoading && requests.length > 0 && requests.map((request) => <FundCard
                    key={request.id}
                    {...request}
                    handleClick={() => handleNavigate(request)} />)}
            </div>
        </div >
    )
}
export default DisplayRequests;
import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract
        ('0x1476A691590929A9378148d859Bd441dd6f75F58'); //It is the address from thirdweb of our smart contract
    const { mutateAsync: createRequest } = useContractWrite(contract, 'createRequest');

    const address = useAddress();
    const connect = useMetamask();

    const publishRequest = async (form) => {
        try {
            const data = await createRequest([
                address,    //owner
                form.title, //title
                form.description,   //description
                form.target,
                new Date(form.deadline).getTime(),//deadline
                form.image
            ])
            console.log("contract call sucess", data)
        }
        catch (error) {
            console.log("error", error);
        }
    }

    const getRequests = async () => {
        const requests = await contract.call('getRequests');

        const parsedRequests = requests.map((request, i) => ({
            owner: request.owner,
            title: request.title,
            description: request.description,
            target: ethers.utils.formatEther(request.target.toString()),
            deadline: request.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther
                (request.amountCollected.toString()),
            image: request.image,
            pId: i
        }));
        return parsedRequests;
    }

    const getUserRequests = async () => {
        const allRequests = await getRequests();

        const filteredRequests = allRequests.filter((request) => request.owner === address);

        return filteredRequests;
    }

    const donate = async (pId, amount) => {
        const data = await contract.call('donateToRequest', pId, { value: ethers.utils.parseEther(amount) });

        return data;
    }

    const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', pId);
        const numberOfDonations = donations[0].length;

        const parseDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parseDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            })
        }

        return parseDonations;
    }
    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                createRequest: publishRequest,
                getRequests,
                getUserRequests,
                donate,
                getDonations,
            }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
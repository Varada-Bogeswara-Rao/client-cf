import React from 'react'
import OngoingCampaigns from '../components/ongoingCampaigns'

export default function campaigns() {
    return(
    <div className="max-w-md mx-auto p-6">

        <h1 className="text-2xl font-bold mb-4">Campaigns</h1>
        <OngoingCampaigns />
    </div>
    );
}
import React from "react";
import ProfileCardView from "./profileCardView";
import { useSession } from 'next-auth/client'


export default function ProfilePanelView({userId}: {
    userId?: string
}) {
    const [session] = useSession();

    // only works if userId is provided in param or user is logged in
    return <ProfileCardView profileUserId={userId ?? session?.user.id} />;
}
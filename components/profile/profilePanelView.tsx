import React from "react";
import ProfileCardView from "./profileCardView";
import { useSession } from 'next-auth/client'
import ProfileSummaryView from "./profileSummaryView";
import ProfileOpenRequestView from "./profileOpenRequest";
import styles from '../../styles/Profile.module.css'
import QuizzesHistoryPanel from "../quiz/quizzesHistoryPanel";
import TutorRequestHistoryPanel from "./tutor/tutorRequestHistoryPanel";


export default function ProfilePanelView({ userId }: {
    userId?: string
}) {
    const [session] = useSession();

    // only works if userId is provided in param or user is logged in
    return <div>
        <div
            className={styles.profileMainViewSection}
            style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                display: "flex",
                marginTop: "1rem",
            }}>
            <ProfileCardView profileUserId={userId ?? session?.user.id} />
            <div style={{
                justifyContent: "flex-end",
                flexDirection: "row",
                flexGrow: 1,
                marginLeft: "2rem",
            }}>
                <ProfileSummaryView />
            </div>
        </div>
        <div className={styles.profileMainViewSection}>
            <QuizzesHistoryPanel displayUser={false} />
        </div>
        <div className={styles.profileMainViewSection}>
            <TutorRequestHistoryPanel displayUser={false} />
        </div>
        <div className={styles.profileMainViewSection}>
            <ProfileOpenRequestView />
        </div>
    </div>;
}
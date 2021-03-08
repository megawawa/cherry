import { getProfileFromUser } from "../../libs/mongoDb/profile/profile";
import { ProfilePreviewType } from "../../libs/user";
import { Card, Button } from "react-bootstrap";
import styles from '../../styles/Home.module.css'
import React from "react";
import ProfileCardView from "../../components/profile/profileCardView";

export default function ProfilePage({ profile, profileUserId }: {
    profile: ProfilePreviewType,
    profileUserId: string,
}) {
    return <main className={styles.main}>
        <ProfileCardView profile={profile} profileUserId={profileUserId} />
    </main>
}

export async function getServerSideProps({ params }) {
    const profile = await getProfileFromUser(params.id);
    return {
        props: {
            profile: profile,
            profileUserId: params.id,
        }
    }
}
import { getProfileFromUser } from "../../libs/mongoDb";
import { getUserProfile, ProfilePreviewType } from "../../libs/user";
import { Card, Button } from "react-bootstrap";
import styles from '../../styles/Home.module.css'
import React, { useEffect, useState } from "react";
import { useSession } from 'next-auth/client'
import EditProfileModal from "./editProfileModal";

/* 
 * profileUserId: if null means we don't know which profile to fetch yet
 * session.user.id is only user for checking if is owner of the profile
 */
export default function ProfileCardView({ profile, profileUserId }: {
    profile?: ProfilePreviewType,
    profileUserId?: string,
}) {
    const [state, setState] = useState<ProfilePreviewType>(profile ?? {});
    const [session] = useSession();

    const syncState = async () => {
        // fetch interest from db
        let userProfile = await getUserProfile(profileUserId);
        userProfile.contact =
            userProfile.contact ?? "";
        userProfile.intro =
            userProfile.intro ?? "";
        userProfile.email =
            userProfile.email ?? "";
        userProfile.otherContact =
            userProfile.otherContact ?? "";
        userProfile.phone =
            userProfile.phone ?? "";
        userProfile.name =
            userProfile.name ?? "";

        setState(userProfile);
    };

    useEffect(() => {
        // already initialized interest.
        if (state.contact != undefined
            && state.intro != undefined
            && state.email != undefined
            && state.otherContact != undefined
            && state.phone != undefined
            && state.name != undefined) {
            return;
        }

        if (!profileUserId) {
            return;
        }

        syncState();
    }, [profileUserId]);

    useEffect(() => {
        setState(profile ?? {});
    }, [profile]);

    const [show, setShow] = useState<boolean>(false);

    return <>
        <EditProfileModal isActive={show} profile={state}
            onClose={setShow.bind(this, false)}
            onSave={() => {
                syncState();
                setShow(false);
            }} />
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{state.name ?? ""}</Card.Title>
                {state.contact &&
                    (<Card.Text>
                        Preferred Contact: {state.contact ?? ""}
                    </Card.Text>)}
                {state.intro &&
                    (<Card.Text>
                        Intro: {state.intro ?? ""}
                    </Card.Text>)}
                {state.email &&
                    (<Card.Text>
                        Email: {state.email ?? ""}
                    </Card.Text>)}
                {state.phone &&
                    (<Card.Text>
                        Phone: {state.phone ?? ""}
                    </Card.Text>)}
                {state.otherContact &&
                    (<Card.Text>
                        Other contact: {state.otherContact ?? ""}
                    </Card.Text>)}

                <div style={{
                    justifyContent: "flex-end",
                    flexDirection: "row",
                    display: "flex",
                    marginTop: "1rem",
                }}>
                    <Button variant="primary" style={
                        {
                            marginRight: "1rem",
                        }}>Contact</Button>
                    {profileUserId == session?.user.id &&
                        <Button variant="light"
                            onClick={setShow.bind(this, true)}>
                            {"Edit"}</Button>}
                </div>
            </Card.Body>
        </Card>
    </>;
}
import { getProfileFromUser } from "../../libs/mongoDb";
import { ProfilePreviewType } from "../../libs/user";
import { Card, Button } from "react-bootstrap";
import styles from '../../styles/Home.module.css'

export default function ProfilePage({ profile }: {
    profile: ProfilePreviewType
}) {
    return <main className={styles.main}>
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{profile.name ?? ""}</Card.Title>
                {profile.contact &&
                    (<Card.Text>
                        Preferred Contact: {profile.contact ?? ""}
                    </Card.Text>)}
                {profile.intro &&
                    (<Card.Text>
                        Intro: {profile.intro ?? ""}
                    </Card.Text>)}
                {profile.email &&
                    (<Card.Text>
                        Email: {profile.email ?? ""}
                    </Card.Text>)}
                {profile.phone &&
                    (<Card.Text>
                        Phone: {profile.phone ?? ""}
                    </Card.Text>)}
                {profile.otherContact &&
                    (<Card.Text>
                        Other contact: {profile.otherContact ?? ""}
                    </Card.Text>)}
                <Button variant="primary">Contact</Button>
            </Card.Body>
        </Card>;
    </main>
}

export async function getServerSideProps({ params }) {
    const profile = await getProfileFromUser(params.id);
    return {
        props: {
            profile: profile,
        }
    }
}
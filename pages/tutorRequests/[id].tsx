import { getTutorRequestFromId } from "../../libs/mongoDb/profile/tutorRequest";
import { TutorRequestFormType } from "../../libs/user";
import styles from '../../styles/Home.module.css'
import React from "react";
import TutorRequestView from "../../components/profile/tutor/tutorRequestView";

export default function TutorRequestPage({ tutorRequest, tutorRequestId, date }: {
    tutorRequest: TutorRequestFormType,
    tutorRequestId: string,
    date: string
}) {
    tutorRequest.requestTime = new Date(date);
    return <main className={styles.main}>
        <TutorRequestView tutorRequest={tutorRequest} tutorRequestId={tutorRequestId} />
    </main>
}

export async function getServerSideProps({ params }) {
    const tutorRequest = await getTutorRequestFromId(params.id);
    // this is a hack because date is not
    // serializable for nextJs getServerSideProps
    const date = tutorRequest.requestTime;
    delete tutorRequest.requestTime;
    console.log("serverside:", tutorRequest);
    return {
        props: {
            tutorRequest: tutorRequest,
            tutorRequestId: params.id,
            date: date.toString(),
        }
    }
}
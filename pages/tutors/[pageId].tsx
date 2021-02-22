import { useRouter } from "next/router";
import { PaginationFooter } from "../../components/libs/paginationFooter";
import TutorsPanel from "../../components/profile/tutor/tutorsPanel";
import { getTopTutors } from "../../libs/mongoDb";
import { TutorPreviewType } from "../../libs/user";
import styles from '../../styles/Problem.module.css'

export default function TutorsPage({ tutors, current }: {
    tutors: Array<TutorPreviewType>,
    current: number,
}) {
    const router = useRouter();
    const handleUpdateIndex = (index) => {
        router.push(
            `/tutors/${index}`
        );
    };

    return <div className={styles.main}>
        <TutorsPanel tutors={tutors} />
        <PaginationFooter current={current}
            onUpdateIndex={handleUpdateIndex} />
    </div>;
}

export async function getServerSideProps({ params }) {
    const current = parseInt(params.pageId) ?? 1;
    const tutors = await getTopTutors(current);
    return {
        props: {
            tutors: tutors,
            current: current,
        }
    };
}
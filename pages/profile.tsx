import MainAccountView from "../components/layout/mainAccountView";

export default function QuizzesPage() {
    return <MainAccountView activeKey={'viewProfile'} />;
}

export async function getServerSideProps({ params }) {
    return {
        props: {}
    };
}
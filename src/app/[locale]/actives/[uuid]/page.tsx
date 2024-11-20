'use client'
import MyActivePage from "@/widgets/active-page/ui/active-page";

const ActivePage = ({ params }: { params: { uuid: string } }) => {
    const { uuid } = params;
    return (
        <>
            <MyActivePage uuid={uuid} />
        </>

    );
};

export default ActivePage;

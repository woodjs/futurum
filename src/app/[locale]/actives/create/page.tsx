import ActiveForm from "@/features/create-active/ui/create-active-form";
import { Container, GradientTypography } from "@/shared/ui";
import { Sidebar } from "@/widgets/sidebar";

const CreateActive = () => {
    return (
        <>
            <div className='hidden xl:block'>
                <Sidebar />
            </div>
            <div className='w-[full]'>
                <div className={'relative'}>
                    <Container>
                        <div className='flex w-[620px] flex-col gap-6'>
                            <GradientTypography className='mb-8'>
                                Создание актива
                            </GradientTypography>
                            <div className="flex flex-col">
                            <ActiveForm/>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default CreateActive;

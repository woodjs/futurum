import {Container} from "@/shared/ui";
import FooterSearch from "@/screens/main/footer/FooterSearch/FooterSearch";
import FooterCategories from "@/screens/main/footer/FooterCategories/FooterCategories";
import FooterInfo from "@/screens/main/footer/FooterInfo/FooterInfo";
import FooterAddress from "@/screens/main/footer/FooterAddress/FooterAddress";

const Footer = () => {
    return <div className="bg-primary mt-[78px]">
        <Container className="flex justify-center flex-col h-full pt-[64px] pb-[37px] gap-8 lg:flex-row lg:justify-between lg:gap-0">
            <FooterSearch/>
            <div className={'flex flex-col gap-8 md:flex-row md:justify-center lg:justify-between lg:gap-0 lg:w-full lg:max-w-[70%]'}>
                <FooterCategories />
                <FooterInfo/>
                <FooterAddress/>
            </div>
        </Container>
    </div>
};

export default Footer;
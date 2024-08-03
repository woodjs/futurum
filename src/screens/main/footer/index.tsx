import {Container} from "@/shared/ui";
import FooterSearch from "@/screens/main/footer/FooterSearch/FooterSearch";
import FooterCategories from "@/screens/main/footer/FooterCategories/FooterCategories";
import FooterInfo from "@/screens/main/footer/FooterInfo/FooterInfo";
import FooterAddress from "@/screens/main/footer/FooterAddress/FooterAddress";

const Footer = () => {
    return <div className="bg-primary mt-[78px]">
        <Container className="flex justify-between h-full pt-[64px] pb-[37px] flex-wrap">
            <FooterSearch/>
            <FooterCategories />
            <FooterInfo />
            <FooterAddress />
        </Container>
    </div>
};

export default Footer;
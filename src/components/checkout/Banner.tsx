import Banner from "../../utils/components/Banner";
import type { banner } from "../../schemas/banner.schema";

const CheckoutBanner = () => {
    const bannerProps : banner = {
        mainTitle: 'Checkout',
        subtitle: 'Checkout',
        linkTo: '/checkout'
    }

    return (
        <>
        <Banner {...bannerProps}/>
        </>
    )
}

export default CheckoutBanner;
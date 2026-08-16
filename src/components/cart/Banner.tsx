import type { banner } from "../../schemas/banner.schema";
import Banner from "../../common/components/Banner";

const CartBanner = () => {
  const bannerProps: banner = {
    mainTitle: "Cart",
    subtitle: "Shop",
    linkTo: "/products",
  };

  return (
    <>
      <Banner {...bannerProps} />
    </>
  );
};

export default CartBanner;

import Layout from "./Layout";
import Home from "./Home";
import ShopPage from "./layout/ShopPage";
import ProductPage from "./layout/ProductPage";
import Checkout from "./Checkout";
import About from "./About";

const routes = [
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "shop",
                element: <ShopPage />,
            },
            {
                path: "shop/:collectionName/:productId",
                element: <ProductPage />,
            },
            {
                path: "checkout",
                element: <Checkout />,
            },
            {
                path: "aboutus",
                element: <About />,
            }
        ],
    }
];

export default routes;
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isCheckout = location.pathname === "/checkout";
    const isDisabled =isCheckout;

    return (
        <div>
            HEADER.
            <button id="checkout-btn" disabled={isDisabled} onClick={() => navigate('checkout')}>checkout</button>
        </div>
    )
}

export default Header;
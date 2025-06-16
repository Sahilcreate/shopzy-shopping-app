import { useState, useEffect } from "react";


const Checkout = () => {
    const [cartItems, setCartItems] = useState();

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem("cartItems"));
        setCartItems(storage);
    }, []);

    const handleQuantityChange = (id, quantity) => {
        const quant = parseInt(quantity);
        const existingCart = JSON.parse(localStorage.getItem("cartItems"));
        console.log(existingCart);
        
        const index = existingCart.findIndex(item => item.id === id);
        existingCart[index].quantity = quant;

        localStorage.setItem("cartItems", JSON.stringify(existingCart));
        setCartItems(existingCart);
    }

    const calculateTotal = () => {
        const total = cartItems?.reduce((accumulator, item) => accumulator + item.quantity*item.price, 0);

        if(cartItems) {
            return Number(total.toFixed(2));
        } else {
            return;
        }

        
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                {cartItems && (
                    <tbody>
                        {
                            cartItems?.map((item) => (
                                <tr>
                                    <td>{item.id}</td>
                                    <td>
                                        <div>{item.title}</div>
                                        <img src={item.imgURL} alt={item.title} width={"100px"} height={"100px"}/>
                                    </td>
                                    <td>
                                        {item.price}
                                    </td>
                                    <td>
                                        <input type="number" value={item.quantity} min={1} onChange={(e) => handleQuantityChange(item.id, e.target.value)}/>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    
                )}
            </table>
            <div>
                <span>Total: </span>
                <span>{calculateTotal()}</span>
            </div>
        </div>
    )
}

export default Checkout;
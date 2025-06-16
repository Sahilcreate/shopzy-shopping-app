import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
    const [productInfo, setProductInfo] = useState({});
    const {collectionName, productId} = useParams();

    console.log(collectionName);
    console.log(productId)
    console.log(productInfo);

    useEffect(() => {
        const fetchData = async() => {
            const url = `https://dummyjson.com/products/${productId}`;
            const res = await fetch(url);
            const data = await res.json();
            setProductInfo(data || {});
        };

        fetchData();
    }, [productId])

    const handleStorageSave = () => {
        console.log("Add to cart Clicked")
        const quant = parseInt(document.getElementById('quantity').value, 10);
        console.log("Quantity:", quant)
        
        const newItem = {
            id: productId,
            title: productInfo.title,
            quantity: quant,
            price: productInfo.price,
            imgURL: productInfo.thumbnail
        }

        const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        console.log(existingCart)
        
        const index = existingCart.findIndex(item => item.id === newItem.id);
        if(index !== -1) {
            existingCart[index].quantity += newItem.quantity;
        } else {
            existingCart.push(newItem);
        }

        localStorage.setItem("cartItems", JSON.stringify(existingCart));
    }

    return (
        <>
            {productInfo && (
                <div>
                <div>/{collectionName}/{productId}</div>
                <img src={productInfo?.images?.[0]} width={"200px"} height={"200px"}/>
                <div>{productInfo.title}</div>
                <div>{productInfo.description}</div>
                <div>${productInfo.price}</div>
                <div>{productInfo.rating}</div>
                <label htmlFor="quantity">Quantity: 
                    <input type="number" id="quantity" name="quantity" min={1}/>
                </label>
                <button onClick={handleStorageSave}>Add to Card</button>
                </div>
            )}
        </>
    );
};

export default ProductPage;
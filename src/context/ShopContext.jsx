import React, { useEffect, useState } from "react";
import { createContext } from "react";
// import {product } from '../assets/assets'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import axios from 'axios'


export const ShopContext = createContext();

const API_BASE = import.meta.env.VITE_APP_API_URL;


const ShopContextProvider = (props) => {


    const currency = '$';
    const delivery_fee = 10;
    // const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate()
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [retryCount, setRetryCount] = useState(0);

    const addToCart = async (itemId, size) => {

        if (!size) {
            toast.error('Select Product Size')
            return
        }

        let cartData = structuredClone(cartItems)

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData)

        if (token) {
            try {

                await axios.post(`${API_BASE}/api/cart/add`, { itemId, size }, { headers: { token } })

            } catch (error) {
                console.log(error);
                toast.error(error.message)

            }
        }
    }


    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;

    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems)

        cartData[itemId][size] = quantity

        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(`${API_BASE}/api/cart/update`, { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)

            }

        }

    }

    const getCartAmount = () => {
        let totalAmount = 0
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount
    }

    const getProductsData = async (retries = 6) => {
        try {
            setLoadingProducts(true);

            const response = await axios.get(`${API_BASE}/api/product/list`);

            if (response.data.success) {
                setProducts(response.data.products);
                setLoadingProducts(false);
                setRetryCount(0);
                return;
            }

        } catch (error) {

            console.log(error.message);

            if (retries > 0) {

                setRetryCount(prev => prev + 1);

                setTimeout(() => {
                    getProductsData(retries - 1);
                }, 5000);

                return;
            }

            setLoadingProducts(false);

            toast.error("Unable to connect to our server.");
        }
    }
    const getUserCart = async (token) => {
        if (!token) return;

        try {
            const response = await axios.post(
                `${API_BASE}/api/cart/get`,
                {},
                { headers: { token } }
            );

            if (response.data.success) {
                setCartItems(response.data.cartData || {});
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getProductsData();
    }, []);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");

        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            getUserCart(token);
        }
    }, [token]);

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate,
        setToken, token, loadingProducts,
        retryCount,

    }


    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
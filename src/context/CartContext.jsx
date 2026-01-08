import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (food, vendor, quantity) => {
        setCartItems((prevItems) => {
            // Check if we already have items from another vendor
            if (prevItems.length > 0 && prevItems[0].vendorId !== vendor.id) {
                if (!window.confirm('Adding items from a different vendor will clear your current cart. Continue?')) {
                    return prevItems;
                }
                return [{
                    foodId: food.id,
                    vendorId: vendor.id,
                    vendorName: vendor.name,
                    foodName: food.name,
                    price: parseFloat(food.price),
                    quantity
                }];
            }

            const existingItem = prevItems.find(item => item.foodId === food.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.foodId === food.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevItems, {
                    foodId: food.id,
                    vendorId: vendor.id,
                    vendorName: vendor.name,
                    foodName: food.name,
                    price: parseFloat(food.price),
                    quantity
                }];
            }
        });
    };

    const removeFromCart = (foodId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.foodId !== foodId));
    };

    const updateQuantity = (foodId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(foodId);
        } else {
            setCartItems((prevItems) =>
                prevItems.map(item =>
                    item.foodId === foodId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = cartItems.length > 0 ? 500 : 0;
    const serviceFee = cartItems.length > 0 ? 20 : 0;
    const grandTotal = cartTotal + deliveryFee + serviceFee;

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            deliveryFee,
            serviceFee,
            grandTotal
        }}>
            {children}
        </CartContext.Provider>
    );
};

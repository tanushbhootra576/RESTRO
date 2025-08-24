import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
    items: [],
};

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existing = state.items.find(
                (item) => item.name === action.payload.name
            );
            if (existing) {
                return {
                    ...state,
                    items: state.items.map((item) =>
                        item.name === action.payload.name
                            ? { ...item, qty: item.qty + 1 }
                            : item
                    ),
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, qty: 1 }],
            };
        }
        case 'REMOVE_FROM_CART': {
            return {
                ...state,
                items: state.items.filter((item) => item.name !== action.payload.name),
            };
        }
        case 'CLEAR_CART':
            return initialState;
        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);
    return (
        <CartContext.Provider value={{ cart: state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}

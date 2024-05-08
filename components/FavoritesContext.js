import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = drill => {
        if (!favorites.some(favorite => favorite.id === drill.id)) {
            setFavorites([...favorites, drill]);
        }
    };

    const removeFavorite = drillId => {
        setFavorites(favorites.filter(favorite => favorite.id !== drillId));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
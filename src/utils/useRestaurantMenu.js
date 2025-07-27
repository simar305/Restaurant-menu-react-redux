import { useEffect, useState } from "react";

const useRestaurantMenu = (resId) => {
    const [restaurantData, setRestaurantData] = useState(null)
    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const data = await fetch(
            `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=22.7195687&lng=75.8577258&restaurantId=${resId}`
        );
        const json = await data.json();
        setRestaurantData(json?.data);
    };

    return restaurantData;
}

export default useRestaurantMenu;
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const restaurantData = useRestaurantMenu(resId);
    const [openIndex, setOpenIndex] = useState(null);

    if (!restaurantData) return <Shimmer />;

    const info = restaurantData?.cards?.[2]?.card?.card?.info;
    const categories = restaurantData?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
        .filter((c) => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

    if (!info) return <Shimmer />;
    const { name, cuisines, costForTwo } = info;

    return (
        <div className="text-center">
            <h1 className="font-bold my-10 text-2xl">{name}</h1>
            <h3 className="font-bold my-10 text-xl">{cuisines.join(", ")}</h3>
            <h3 className="font-bold my-10 text-xl">{costForTwo}</h3>

            {categories?.map((category, index) => (
                <RestaurantCategory
                    key={category.card.card.title || index}
                    data={category.card.card}
                    isOpen={openIndex === index}
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                />
            ))}
        </div>
    );
};


export default RestaurantMenu;

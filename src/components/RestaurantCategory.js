import { useState } from "react";
import ItemList from "../ItemList";

const RestaurantCategory = (data) => {
    const [showItems, setShowItems] = useState(false);

    const handleClick = () => {
        setShowItems(!showItems)
    }
    return (
        <div className="w-6/12 bg-gray-100 my-4 shadow-lg p-4 m-auto ">
            <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                <span>{data.data.title} ({data.data.itemCards.length})</span>
                <span>Open</span>
            </div>
            {showItems && <ItemList items={data.data.itemCards} />}
        </div>
    )
}

export default RestaurantCategory;
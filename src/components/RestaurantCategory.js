import { useState } from "react";
import ItemList from "../ItemList";

const RestaurantCategory = ({ data, isOpen, onClick }) => {
    return (
        <div className="w-6/12 bg-gray-100 my-4 shadow-lg p-4 m-auto">
            <div className="flex justify-between cursor-pointer" onClick={onClick}>
                <span>{data.title} ({data.itemCards.length})</span>
                <span>{isOpen ? "Close" : "Open"}</span>
            </div>
            {isOpen && <ItemList items={data.itemCards} />}
        </div>
    );
};

export default RestaurantCategory;
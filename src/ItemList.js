import { useDispatch } from "react-redux";
import { IMG_CDN_URL } from "./components/RestaurantCard";
import { addItem } from "./utils/cartSlice";

const ItemList = ({ items }) => {
    const dispatch = useDispatch();

    const handleAddItems = (item) => {
        // Dispatch an action
        dispatch(addItem(item))
    }

    return (
        <div><ul>
            {items.map((item, index) =>
                <div key={`${item.card.info.id}-${index}`} className="p-2 m-2 border-gray-200 text-left border-b-2 flex justify-between">
                    <div className="w-9/12 ">
                        <div className="py-2">
                            <span>{item.card.info.name}</span>{" "}
                            <span>Rs. {(item.card.info.price || item.card.info.defaultPrice) / 100}</span>
                        </div>
                    </div>
                    <p className="text-xs">{item.card.info.description}</p>
                    <div className="w-3/12 p-4">
                        <div className="absolute">
                            <button className="p-2 mx-16 rounded-lg bg-black text-white shadow-lg"
                                onClick={() => handleAddItems(item)}>
                                Add +
                            </button>
                        </div>
                    </div>
                    <div className="3/12 p-4">
                        <img src={IMG_CDN_URL + item.card.info.imageId} className="w-full" />
                    </div>
                </div>)}
        </ul></div>
    )
}

export default ItemList;
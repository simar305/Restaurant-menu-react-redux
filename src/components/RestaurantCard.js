export const IMG_CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/";
const RestaurantCard = ({
    name,
    cuisines,
    avgRating,
    deliveryTime,
    costForTwo,
    imageId
}) => {
    const fallbackImg = "https://via.placeholder.com/200";
    return (
        <div className="m-4 p-4 w-[250px] rounded-lg bg-gray-200 hover:bg-gray-600">
            <img
                className="rounded-lg"
                src={imageId ? IMG_CDN_URL + imageId : fallbackImg}
                alt={name}
            />
            <h3 className="font-bold py-4 text-lg">{name}</h3>
            <h4>{cuisines}</h4>
            <h4>⭐ {avgRating}</h4>
            <h4>{costForTwo}</h4>
            <h4>{deliveryTime}</h4>
        </div>
    );
};

export const withPromotedLabel = (RestaurantCard) => {
    return (props) => {
        return (
            <div>
                <label className="absolute bg-black text-white m-2 p-2">Promoted</label>
                <RestaurantCard {...props} />
            </div>
        )
    }
}

export default RestaurantCard;
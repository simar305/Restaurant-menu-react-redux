import { useEffect, useState } from "react";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Body = () => {
    const [resData, setResData] = useState();
    const [searchText, setSearchText] = useState("");
    const [filteredList, setFilteredList] = useState([]);
    const [categories, setCategories] = useState([])
    useEffect(() => {
        fetchData();
    }, [])

    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard)
    const fetchData = async () => {
        const response = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.7195687&lng=75.8577258&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING')
        const json = await response.json();
        const data = json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;
        setResData(data)
        setFilteredList(data)
        setCategories(json.data.cards.filter(c => c.card.card?.["@type"]))
    }

    if (!resData) {
        return <Shimmer />
    }

    return (
        <div className="body">
            <div className="filter flex">
                <div className="search m-4 p-4">
                    <input type="text" className="border border-solid border-black" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                    <button className="px-4 py-2 bg-green-100 m-4 rounded-lg" onClick={() => {
                        const results = resData?.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()))
                        setFilteredList(results)
                    }}>Search</button>
                </div>
                <div className="search m-4 p-4 flex items-center">
                    <button className="px-4 py-2 bg-gray-100" onClick={() => {
                        setResData(resData.filter((res) => res.info.avgRating >= 4.4))
                    }}>Top Rated Restaurants</button>
                </div>
            </div>
            <div className="res-container flex flex-wrap">
                {filteredList?.map((res, index) => (
                    <Link to={"/restaurants/" + res.info.id} key={res.info.id}>
                        {
                            res.info.name === 'Pizza Hut' || res.info.name === 'KFC' ?
                                <RestaurantCardPromoted key={res.info.id || index}
                                    name={res.info.name}
                                    cuisines={res.info.cuisines.join(", ")}
                                    avgRating={res.info.avgRating}
                                    deliveryTime={res.info.sla.slaString}
                                    costForTwo={res.info.costForTwo}
                                    imageId={res.info.cloudinaryImageId} /> :

                                <RestaurantCard
                                    key={res.info.id || index}
                                    name={res.info.name}
                                    cuisines={res.info.cuisines.join(", ")}
                                    avgRating={res.info.avgRating}
                                    deliveryTime={res.info.sla.slaString}
                                    costForTwo={res.info.costForTwo}
                                    imageId={res.info.cloudinaryImageId}
                                />
                        }
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Body;
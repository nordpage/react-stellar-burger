import React from 'react';
import {useGetFeedQuery} from "../../../services/reducers/burgerApi";
import {useParams} from "react-router-dom";
import {FEED} from "../../../utils/constants";
import SingleFeedPage from "../single-feed";

function OrderFeedDetails() {

    const { data = [] } = useGetFeedQuery();

    const {id} = useParams();
    const feedId = localStorage.getItem(FEED);

    const currentId = feedId !== null ? feedId : id;

    const order = data.orders.find(x => x._id === currentId);

    return (
        <SingleFeedPage order={order}/>
    );
}

export default OrderFeedDetails;
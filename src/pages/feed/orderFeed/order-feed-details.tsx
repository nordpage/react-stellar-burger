import React from 'react';
import {useGetFeedQuery} from "../../../services/reducers/burgerApi";
import {useParams} from "react-router-dom";
import {FEED} from "../../../utils/constants";
import SingleFeedPage from "../single-feed";

function OrderFeedDetails() {

    const { data = [], isSuccess } = useGetFeedQuery();

    const {id} = useParams();
    const feedId = localStorage.getItem(FEED);

    const currentId = feedId !== null ? feedId : id;

    const order = isSuccess ? data.orders.find(x => x._id === currentId) : null;

    return order && (
        <SingleFeedPage order={order}/>
    );
}

export default OrderFeedDetails;
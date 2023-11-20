import React from 'react';
import {useGetUserFeedQuery} from "../services/reducers/burgerApi";
import {useParams} from "react-router-dom";

function SingleFeedPage() {
    const { data } = useGetUserFeedQuery();

    const {id} = useParams();
    const feedId = localStorage.getItem(FEED);

    const currentId = feedId !== null ? feedId : id;

    const item = data.find(x => x._id === currentId);

    return item && (
        <div></div>
    );
}

export default SingleFeedPage;
import React from 'react';
import {useGetFeedQuery} from "../../../services/reducers/burgerApi";
import styles from "../order-full.module.css";
import {FadeLoader} from "react-spinners";
import ProfileFeedDetails from "./profile-feed-details";

function ProfileFeedPage() {

    const {data, isLoading, isSuccess} = useGetFeedQuery();

    return (
        <div>
            {isLoading && <div className={styles.loader}>
                <FadeLoader color="#8585AD" />
            </div>}
            {isSuccess && data !== undefined && <ProfileFeedDetails/> }
        </div>
    );
}

export default ProfileFeedPage;
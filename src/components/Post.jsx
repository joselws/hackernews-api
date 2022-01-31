import clock from '../icons/clock.png';
import hollowHeart from '../icons/hollow-heart.png';
import fullHeart from '../icons/full-heart.png';
import { useState } from 'react';

const Post = ({ post }) => {
    const [favorite, setFavorite] = useState(false);

    return (
        <a className="post-wrapper" href={ post.story_url } target="_blank">
            <div className="text-section">
                <div className="time-author-wrapper">
                    <img className="clock-icon" src={clock} alt="clock icon" />
                    <p className="time-author-info">{ post.created_at } by { post.author }</p>
                </div>
                <div className="post-info-wrapper">
                    <p className="post-info">{ post.story_title }</p>
                </div>
            </div>

            <div className="heart-section">
                { favorite ? <img className="heart-icon" src={fullHeart} alt="Favorite post" /> 
                    : <img className="heart-icon" src={hollowHeart} alt="Non-favorite post" /> }
            </div>
        </a>
    )
}

export default Post;
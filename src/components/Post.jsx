import clock from '../icons/clock.png';
import hollowHeart from '../icons/hollow-heart.png';
import fullHeart from '../icons/full-heart.png';

const Post = ({ favPosts, removeFavPost, addNewFavPost, post }) => {

    return (
        <div className="post-wrapper">
            <a className="text-section" href={ post.story_url } target="_blank">
                <div className="time-author-wrapper">
                    <img className="clock-icon" src={clock} alt="clock icon" />
                    <p className="time-author-info">{ post.created_at } by { post.author }</p>
                </div>
                <div className="post-info-wrapper">
                    <p className="post-info">{ post.story_title }</p>
                </div>
            </a>

            { favPosts.indexOf(post) === -1 ? 
                <div className="heart-section" onClick={() => addNewFavPost(post)}>
                    <img className="heart-icon" src={hollowHeart} alt="non-favorite post" />
                </div>    
            :
                <div className="heart-section" onClick={() => removeFavPost(post)}>
                    <img className="heart-icon" src={fullHeart} alt="favorite post" />
                </div>   
            }
        </div>
    )
}

export default Post;
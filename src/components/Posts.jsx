import clock from '../icons/clock.png';
import hollowHeart from '../icons/hollow-heart.png';
import fullHeart from '../icons/full-heart.png';

const Posts = ({ favs, favPosts, removeFavPost, addNewFavPost, posts }) => {

    // parse the post's datetime into an appropriate format
    const parseDate = (datetime) => {
        let today = new Date().getTime();
        let postTime = new Date(datetime).getTime();
        // convert to hours
        let time = (today - postTime)/(1000*3600);
        // less than 1 hour (display in minutes)
        if (time < 1) {
            time = Math.round(time*60);
            if (time === 1) {
                return `${time} minute ago`;
            } else {
                return `${time} minutes ago`;
            }
        // less than 24 hours (display in hours)
        } else if (time <= 23) {
            time = Math.round(time);
            if (time === 1) {
                return `${time} hour ago`;
            } else {
                return `${time} hours ago`;
            }
        // at least 24 hours (display in days)
        } else {
            time = Math.round(time/24);
            if (time === 1) {
                return `${time} day ago`;
            } else {
                return `${time} days ago`;
            }        
        }
    }

    // remove post of render when you unfavorite it
    const removePost = (e) => {
        // only remove while on favorites filter
        if (favs) {
            let element = e.target;
            // box around heart was clicked
            if (element.tagName === 'DIV') {
                element.parentElement.style.display = 'none';
            // heart was clicked
            } else {
                element.parentElement.parentElement.style.display = 'none';
            }
        }
    }


    return (
        <div className="posts-wrapper">
            { posts.map((post, index) => 
                <div key={index} className="post-wrapper">
                    <a className="text-section" href={ post.story_url } target="_blank">
                        <div className="time-author-wrapper">
                            <img className="clock-icon" src={clock} alt="clock icon" />
                            <p className="time-author-info">{ parseDate(post.created_at) } by { post.author }</p>
                        </div>

                        <div className="post-info-wrapper">
                            <p className="post-info">{ post.story_title }</p>
                        </div>
                    </a>
    
                    { favPosts.includes(post) ? 
                        <div className="heart-section" onClick={(event) => {removeFavPost(post); removePost(event);}}>
                            <img className="heart-icon" src={fullHeart} alt="favorite post" />
                        </div>   
                    :
                        <div className="heart-section" onClick={() => addNewFavPost(post)}>
                            <img className="heart-icon" src={hollowHeart} alt="non-favorite post" />
                        </div>  
                    }
                </div>            
            )}
        </div>
    )
}

export default Posts;
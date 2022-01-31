import Post from './Post';

const Posts = ({ favPosts, removeFavPost, addNewFavPost, posts }) => {
    return (
        <div className="posts-wrapper">
            { posts.map((post, index) => 
                <Post favPosts={favPosts} key={ index } removeFavPost={removeFavPost} addNewFavPost={addNewFavPost} post={ post } /> 
            )}
        </div>
    )
}

export default Posts;
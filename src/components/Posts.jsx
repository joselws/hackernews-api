import Post from './Post';

const Posts = ({ posts }) => {
    return (
        <div className="posts-wrapper">
            { posts.map((post, index) => <Post key={ index } post={ post } /> )}
        </div>
    )
}

export default Posts;
const Post = ({ post }) => {
    return (
        <div className="post-wrapper">
            <p className="time-author">{ post.created_at } by { post.author }</p>
            <p className="post-info">{ post.story_title }</p>
        </div>
    )
}

export default Post;
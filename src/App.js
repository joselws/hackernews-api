import { useState, useEffect } from 'react';
import Header from './components/Header';
import Buttons from './components/Buttons';
import Dropdown from './components/Dropdown';
import Posts from './components/Posts';

function App() {
  /***** State section *****/
  // store selected frontend framework from dropdown list
  const [framework, setFramework] = useState(null);
  // flag for displaying only favorites or all posts from buttons 
  const [favs, setFavs] = useState(false);
  // array to store the posts data
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);  // starts at page 1

  // handles choice between 'all' and 'my favs' buttons
  const changeFavs = (bool_value) => {
    setFavs(bool_value);
  }

  // handles selection of framework from dropdown list
  const changeFramework = (e) => {
    let selected_framework = e.target.value;
    if (framework !== selected_framework) {
      setFramework(selected_framework);
      setPage(0);
      setPosts([]);
    }
  }

  /***** Fetch section *****/
  useEffect(() => {
    fetchPosts();
  }, [framework, favs, page])

  // fetches data regarding the selected framework and all/favs choice
  const fetchPosts = async () => {
    if (framework !== null) {
      const res = await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${framework}&page=${page}`);
      const dataPosts = await res.json();
      parsePosts(dataPosts.hits);
    }
  }

  // add valid posts to the posts state
  const parsePosts = (dataPosts) => {
    const validPosts = [];
    dataPosts.map(post => {
      if (post.author === null || post.story_title === null || post.story_url === null || post.created_at === null) {
      } else {
        validPosts.push(post);
      }
    })
    setPosts([...posts, ...validPosts]);
  }


  return (
    <div className="main-container">
      <Header />
      <Buttons favs={ favs } changeFavs={ changeFavs } />
      <Dropdown framework={ framework } changeFramework={ changeFramework } />
      { framework ? <p>{ framework }</p> : <p>No framework selected yet</p> }
      { posts.length > 0 ? <p>{ `Number of posts: ${posts.length}` }</p> : <p>No posts</p> }
      <Posts posts={ posts } />
    </div>
  );
}

export default App;

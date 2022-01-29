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
  const [nextPageAvailable, setNextPageAvailable] = useState(true)

  // handles choice between 'all' and 'my favs' buttons
  const changeFavs = (bool_value) => {
    setPosts([]);
    setFavs(bool_value);
    setPage(0);
  }

  // handles selection of framework from dropdown list
  const changeFramework = (e) => {
    let selected_framework = e.target.value;
    if (framework !== selected_framework) {
      setPosts([]);
      setPage(0);
      setFramework(selected_framework);
    }
  }

  // infinite scroll
  window.addEventListener('scroll', () => {
    // we scrolled down to the bottom of the page
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && nextPageAvailable) {
      setNextPageAvailable(false);
      setPage(page + 1);
      setInterval(() => {
        // wait at least 2 seconds until you are able to load the next page
      }, 2000);
    }

    // we are not at the bottom of the page
    if (window.innerHeight + window.scrollY < document.body.offsetHeight) {
      setNextPageAvailable(true);
    }
  })


  /***** Fetch section *****/
  useEffect(() => {
    fetchPosts();
  }, [page, framework])

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
      if (post.author !== null || post.story_title !== null || post.story_url !== null || post.created_at !== null) {
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
      { favs ? <p>Displaying favorites</p> : <p>Displaying all</p> }
      { framework ? <p>{ framework }</p> : <p>No framework selected yet</p> }
      { posts.length > 0 ? <p>{ `Number of posts: ${posts.length}` }</p> : <p>No posts</p> }
      { page >= 0 ? <p>Page { page }</p> : <p></p>}
      <Posts posts={ posts } />
    </div>
  );
}

export default App;

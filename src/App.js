import { useState, useEffect } from 'react';
import Header from './components/Header';
import Buttons from './components/Buttons';
import Dropdown from './components/Dropdown';
import Posts from './components/Posts';
import Pages from './components/Pages';

function App() {
  /***** State section *****/
  // store selected frontend framework from dropdown list
  const [framework, setFramework] = useState(null);
  // flag for displaying only favorites or all posts from buttons 
  const [favs, setFavs] = useState(false);
  // array to store the posts data
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);  // starts at page 1
  // data for buttons at the bottom of the page to select the desired page
  const [pageButtons, setPageButtons] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, '>'])

  // handles choice between 'all' and 'my favs' buttons
  const changeFavs = (boolValue) => {
    if (favs !== boolValue) {
      setPosts([]);
      setFavs(boolValue);
      setFramework(null);
      changePage(0);
    }
  }

  // handles selection of framework from dropdown list
  const changeFramework = (selectedFramework) => {
    if (framework !== selectedFramework) {
      setPosts([]);
      changePage(0);
      setFramework(selectedFramework);
    }
  }

  // handles selection of page when a page button is clicked
  const changePage = (pageNumber) => {
    let selectedPage;
    if (pageNumber === '<') {
      selectedPage = page - 1;
    } else if (pageNumber === '>') {
      selectedPage = page + 1;
    } else {
      selectedPage = pageNumber;
    }
    setPage(selectedPage);
    getPageButtons(selectedPage);
  }

  // handles the display of page buttons
  const getPageButtons = (selectedPage) => {
    // dont show '<' if we are in the first page
    if (selectedPage === 0) {
      setPageButtons([0, 1, 2, 3, 4, 5, 6, 7, 8, '>']);
      // show the default pages when the page is at least 5
    } else if (selectedPage <= 4) {
      setPageButtons(['<', 0, 1, 2, 3, 4, 5, 6, 7, 8, '>']);
      // show 4 pages below and above the current page for pages greater than 5
    } else {
      const pages = [];
      pages.push(selectedPage)
      for(let i = 1; i <= 4; i++) {
        pages.push(selectedPage + i);
        pages.push(selectedPage - i);
      }
      pages.sort((a, b) => a - b);
      pages.unshift('<');
      pages.push('>');
      setPageButtons(pages);
    }
  }


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
    const validPosts = dataPosts.filter(post => {
      return (post.author !== null && post.story_title !== null && post.story_url !== null && post.created_at !== null)
    })
    setPosts([...validPosts]);
  }


  return (
    <div className="main-container">
      <Header />
      <Buttons favs={ favs } changeFavs={ changeFavs } />
      <div className="body-container">
        { favs || <Dropdown framework={ framework } changeFramework={ changeFramework } /> }
        { favs ? <p>Displaying favorites</p> : <p>Displaying all</p> }
        { framework ? <p>{ framework }</p> : <p>No framework selected yet</p> }
        { posts.length > 0 ? <p>{ `Number of posts: ${posts.length}` }</p> : <p>No posts</p> }
        { page >= 0 ? <p>Page { page }</p> : <p></p>}
        <Posts posts={ posts } />
      </div>
      { !favs ? framework !== null ? <Pages page={ page } pageButtons={ pageButtons } changePage={ changePage } /> : <p></p> : <p></p> }
    </div>
  );
}

export default App;

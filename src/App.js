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
  // store favorite posts
  const [favPosts, setFavPosts] = useState([]);
  // display dropdown on click
  const [dropdownClicked, setDropdownClicked] = useState(false);

  /***** App methods *****/

  // handles choice between 'all' and 'my favs' buttons
  const changeFavs = (boolValue) => {
    // we didn't click the same button
    if (favs !== boolValue) {
      setFavs(boolValue);
      localStorage.setItem('favs', boolValue);
    }
  }

  // handles selection of framework from dropdown list
  const changeFramework = (selectedFramework) => {
    if (framework !== selectedFramework) {
      setPosts([]);
      changePage(0);
      setFramework(selectedFramework);
      localStorage.setItem('framework', selectedFramework);
    }
  }

  const changeDropdown = (boolValue) => {
    // we clicked on it again although options are displayed
    if (dropdownClicked === boolValue) {
      setDropdownClicked(false);
    } else {
      setDropdownClicked(boolValue);
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
    localStorage.setItem('page', selectedPage);
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

  // Add new post to favorites when heart icon is clicked
  const addNewFavPost = (clickedPost) => {
    let updatedFavPosts = [clickedPost, ...favPosts];
    localStorage.setItem('favPosts', JSON.stringify(updatedFavPosts));
    setFavPosts(updatedFavPosts);
  }

  const removeFavPost = (clickedPost) => {
    let updatedFavPosts = [];
    favPosts.forEach(post => {
      if(post.created_at !== clickedPost.created_at) {
        updatedFavPosts.push(post);
      }
    });
    localStorage.setItem('favPosts', JSON.stringify(updatedFavPosts));
    setFavPosts(updatedFavPosts);
  }


  /***** Fetch section *****/

  useEffect(() => {
    if (localStorage.getItem('framework')) {
      storedData();
    }
    fetchPosts();
  }, [page, framework])

  // initializes states from local storage
  const storedData = () => {
    const localFramework = localStorage.getItem('framework') ? localStorage.getItem('framework') : null;
    const localFavs = localStorage.getItem('favs') ? JSON.parse(localStorage.getItem('favs')) : false;
    const localPosts = JSON.parse(localStorage.getItem('favs')) && localStorage.getItem('favPosts') ? JSON.parse(localStorage.getItem('favPosts')) : [];
    const localPage = localStorage.getItem('page') ? JSON.parse(localStorage.getItem('page')) : 0;
    const localFavPosts = localStorage.getItem('favPosts') ? JSON.parse(localStorage.getItem('favPosts')) : [];

    setFramework(localFramework);
    setFavs(localFavs);
    setPosts(localPosts);
    setPage(localPage);
    setFavPosts(localFavPosts);
  }

  // fetches data regarding the selected framework and all/favs choice
  const fetchPosts = async () => {
    if (framework !== null && !favs) {
      const res = await fetch(`https://hn.algolia.com/api/v1/search_by_date?query=${framework}&page=${page}`);
      const dataPosts = await res.json();
      parsePosts(dataPosts.hits);
    }
  }

  // add valid posts to the posts state
  const parsePosts = (dataPosts) => {
    let validPosts = dataPosts.filter(post => post.author !== null && post.story_url !== null && post.story_title !== null && post.created_at !== null);
    
    setPosts([...validPosts]);
  }


  return (
    <div className="main-container">
      <Header />
      <Buttons favs={ favs } changeFavs={ changeFavs } />
      <div className="body-container">
        { favs || <Dropdown dropdownClicked={dropdownClicked} changeDropdown={changeDropdown} framework={ framework } changeFramework={ changeFramework } /> }
        <Posts favPosts={favPosts} favs={favs} removeFavPost={ removeFavPost } addNewFavPost={ addNewFavPost } posts={ favs ? favPosts : posts } />
      </div>
      { !favs && framework !== null ? <Pages page={ page } pageButtons={ pageButtons } changePage={ changePage } /> : <p></p> }
    </div>
  );
}

export default App;
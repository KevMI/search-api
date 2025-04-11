import axios from 'axios'
import './App.css'
import { Header } from './components/Header'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Item } from './models/Item';
import noimageavailable from '././assets/noimageavailable.png';

const API_KEY = "AIzaSyCB90LiEbSgWflIYxB7L7lxJFo9xahZu24";
const SEARCH_ID = "14769bc8452e741f5";

function App() {

  const [count, setCount] = useState<number>(1);
  const [items, setItems] = useState<Item[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
        params: {
        q: searchText,
        key: API_KEY,
        cx: SEARCH_ID,
        start: count,
        }
      })
      const data = await response.data.items;
      setItems(data);
      setCount(1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNext = async () => {
    const updatedCount = count + 10;
    setCount(updatedCount);
    try {
      const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
        params: {
          q: searchText,
          key: API_KEY,
          cx: SEARCH_ID,
          start: updatedCount,
        }
      })
      const data = await response.data.items;
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrevious = async () => {
    let updatedCount = count;

    if (count >= 11) {
      updatedCount = count - 10;
      setCount(updatedCount);
    } else {
      return
    };

    try {
      const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
        params: {
          q: searchText,
          key: API_KEY,
          cx: SEARCH_ID,
          start: updatedCount,
        }
      })
      const data = await response.data.items;
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  return <>
  <Header></Header>
  <section className='search-container'>
    <h3>Search the web for news!</h3>
    <form>
      <input type="text" value={searchText} onChange={(e) => handleChange(e)}/>
      <button onClick={handleSubmit}>Search</button>
    </form>
  </section>
  <section className='search-results'>
    {items.map((i) => {
      return <div className='search-results-container' key={i.title}>
        {i.pagemap.cse_thumbnail ? (
          <img src={i.pagemap.cse_thumbnail[0].src} alt="" />
        ) : (
          <img src={noimageavailable}/>
        )}
        <div>
        <h3>{i.title}</h3>
        <p>{i.snippet}</p>
        <a href={i.htmlFormattedUrl}>{i.formattedUrl}</a>
        </div>
      </div>
    })}
  </section>
  {items.length > 0 &&  <section className='pagination'>
    <button className={count <= 1 ? 'previous-button-prevent' : 'next-button-proceed'} onClick={handlePrevious}>Previous</button>
    <button onClick={handleNext}>Next</button>
  </section>}
  </>
}

export default App

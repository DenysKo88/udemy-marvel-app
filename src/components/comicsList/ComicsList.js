import './comicsList.scss';
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from 'react-router-dom';



const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();


    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded);
        };

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if(newComicsList.length <8){
            ended = true;
        }

        setComicsList([...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset + 8);
        setComicsEnded(ended);
    }
    
    function renderItems(arr) {
        const items = arr.map((comic) => {
            return (
              <li 
                className="comics__item"
                key={comic.id}
                >
                <Link to={`/comics/${comic.id}`}>
                  <img
                    src={comic.thumbnail}
                    alt={comic.title}
                    className="comics__item-img"
                  />
                  <div className="comics__item-name">
                    {comic.title}
                  </div>
                  <div className="comics__item-price">{comic.price}</div>
                </Link>
              </li>
            );
        });
        return <ul className="comics__grid">{items}</ul>
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
      <div className="comics__list">
        {errorMessage}
        {spinner}
        {items}
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ display: comicsEnded ? "none" : "block" }}
          onClick={() => {
            onRequest(offset);
          }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
}


export default ComicsList;
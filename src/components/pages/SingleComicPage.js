
import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import "./singleComicPage.scss";
import AppBanner from "../appBanner/AppBanner";

const SingleComicPage = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);

    const { loading, error, getComic, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded);
    };

    const onComicLoaded = (comic) => {
        setComic(comic);
    };

    const skeleton = comic || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <div className="single-comic-page">
            <AppBanner/>
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>

    );
};

const View = ({comic}) => {
    const {title, description, pageCount, price, language, thumbnail} = comic;
    return (
        <div className="single-comic">
            <Helmet>
                <meta 
                    name="description" 
                    content={`${title} comics book`} />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
            <h2 className="single-comic__name">{title}</h2>
            <p className="single-comic__descr">
               {description}
            </p>
            <p className="single-comic__descr">{pageCount}</p>
            <p className="single-comic__descr">Language: {language}</p>
            <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">
            Back to all
            </Link>
        </div>
    )
}

export default SingleComicPage;

import { Link, NavLink} from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
    return (
      <header className="app__header">
        <h1 className="app__title">
          <a href="#">
            <Link to="/">
              <span>Marvel</span> information portal
            </Link>
          </a>
        </h1>
        <nav className="app__menu">
          <ul>
            <li>
              <NavLink end style={({isActive}) => ({color: isActive ? '#9F0013' : 'inherit'})} to="/">
                <a href="#">Characters</a>
              </NavLink>
            </li>
            /
            <li>
              <NavLink end style={({isActive}) => ({color: isActive ? '#9F0013' : 'inherit'})} to="/comics">
                <a href="#">Comics</a>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
}

export default AppHeader;
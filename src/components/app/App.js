import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {MainPage, ComicsPage, Page404, SingleComicPage} from '../pages';
import SingleCharacterPage from "../pages/SingleCharacterPage";



const App = () => {


    return (
      <Router>
        <div className="app">
          <AppHeader />
          <main>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/comics" element={<ComicsPage />} />
              <Route path="*" element={<Page404 />} />
              <Route path="/comics/:comicId" element={<SingleComicPage />} />
              <Route path="/characters/:id" element={<SingleCharacterPage/>} />
            </Routes>
          </main>
        </div>
      </Router>
    );
}

export default App;
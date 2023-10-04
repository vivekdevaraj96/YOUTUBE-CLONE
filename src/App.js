import { Container } from "react-bootstrap";
import "./App.css";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import "./_app.scss";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,Redirect
} from "react-router-dom";
import WatchScreen from "./screens/watchScreen/WatchScreen";

const Layout = ({ children, setVideos}) => {
  const [sidebar, toggleSidebar] = useState(false);

  const handleToggleSidebar = () => toggleSidebar((value) => !value);
  return (
    <div>
      <Header handleToggleSidebar={handleToggleSidebar} setVideos={setVideos}/>
      <div className="app__container border border-info">
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className="app__main border border-warning">
          {children}
        </Container>
      </div>
    </div>
  );
};

function App() {
  const [videos,setVideos]=useState([])
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Layout setVideos={setVideos}>
            <HomeScreen videos={videos} setVideos={setVideos}/>
          </Layout>
        </Route>
        <Route path="/search">
          <Layout setVideos={setVideos}>
            <h1>Search Results</h1>
          </Layout>
        </Route>
        <Route path="/watch/:id">
          {/* <Layout> */}
            <WatchScreen/>
          {/* </Layout> */}
        </Route>
        <Route>
          <Redirect to='/'/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

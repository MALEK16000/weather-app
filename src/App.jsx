
import './App.module.css';
import {Button, Container} from "react-bootstrap";
import { SearchBar } from './Components/SearchBar/SearchBar';
import { Wallpaper } from './Components/Wallpaper/Wallpaper';
import { Weather } from './Components/Weather/Weather';
import { Provider } from 'react-redux';
import { store } from "./app/store";


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Wallpaper/>
        <Container>

        <SearchBar/>
        <Weather />
    
        </Container>
      </Provider>
      
    </div>
  );
}

export default App;

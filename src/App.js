import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './page/Home';
import { FilterProvider } from './component/Filterdata';

function App() {
  return (
    <div className="App">
      <FilterProvider>
        <BrowserRouter>
          <Home />
          
        </BrowserRouter>
      </FilterProvider>
    </div>
  );
}

export default App;

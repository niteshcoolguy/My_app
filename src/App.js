import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import DataDisplay from './DataDisplay';
import DataDisplay from './Display_Data';
import ProductDetail from './ProductDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<DataDisplay />} />
                <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
        </Router>
    );
}

export default App;

import { Routes } from './routes';
import './global.css'
import { ProviderTable } from './pages/contexts/TableContext'


function App() {
  return (
    <ProviderTable>
      <Routes />
    </ProviderTable>
  );
}

export default App;

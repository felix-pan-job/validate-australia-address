import './App.css';
import { Provider } from 'react-redux';
import ValidateAddress from './features/ValidateAddress/ValidateAddress';
import store from './store/store';

export const DEBUG = process.env.REACT_APP_DEBUG === "development";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ValidateAddress />
      </Provider>
    </div>
  );
}

export default App;

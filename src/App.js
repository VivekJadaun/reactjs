import logo from './logo.svg';
import { Provider } from "react-redux";

import store from "./store/";

import './App.css';
import ContactManager from './components/ContactManager/contact-manager';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ContactManager />
      </div>
    </Provider>
  );
}

export default App;

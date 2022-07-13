import { Provider } from "react-redux";
import { store } from "../store/store";

const App = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);

export default App;

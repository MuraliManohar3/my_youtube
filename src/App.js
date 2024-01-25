import './App.css';
import Head from './components/Head';
import Body from './components/Body';
import { Provider } from 'react-redux';
import store from './utils/store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import WatchPage from './components/WatchPage';

const appRouter=createBrowserRouter([{
  path:"/",
  element:<Body/>,
  //all these children will go into the outlet
  children:[
    {
      path:"/",
      element:<MainContainer/>
    },
    {
      path:"watch",
      element:<WatchPage/>
    },

  ]
}])

function App() {
  return (
    <Provider store={store}>
    <div>
      <h1 className="text-10xl font-bold "></h1>
      <Head/>
      <RouterProvider router={appRouter}/>
      {/* {
        head
        body
          sidebar
             menuItems
          MainContainer
            ButtonsList
            VideoContainer
              VideoCard

      } */}
    </div>
    </Provider>
  );
}

export default App;

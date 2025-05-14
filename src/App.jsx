import './App.css';

import Layout from './Components/Layout/Layout';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import CallDataContextProvider from './context/calldata';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AllTaskLayout from './Components/AllTaskLayout/AllTaskLayout';
import MainPageLayout from './Components/MainPageLayout/MainPageLayout';

function App() {
  const quirey = new QueryClient();
  let router = createBrowserRouter([
    {
      path: '',
      element: <Layout />,
      children: [
        { path: '/', index: true, element: <MainPageLayout /> },
        { path: '/allTasksLayout', element: <AllTaskLayout /> },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={quirey}>
        <CallDataContextProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster />
          <ReactQueryDevtools />
        </CallDataContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;

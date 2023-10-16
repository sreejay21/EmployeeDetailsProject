import {RouterProvider, createBrowserRouter,Route} from 'react-router-dom'
import EmployeeList from "./components/EmployeeList";
import Login from "./components/Login";
import AddEmployeeForm from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';

const router =createBrowserRouter([
  {path:"",element:<Login/>},
  {path:"/employee/add",element:<AddEmployeeForm/>},
  {path:"/employee",element:<EmployeeList/>},
  {path:'/edit/:employeeID',element:<EditEmployee/>}
])

function App() {
  return (
    <RouterProvider router={router}>
      <Route path="" element={<Login />} />
      < Route path='/employee/add' element={<AddEmployeeForm/>}/>
      <Route path="/employee" element={<EmployeeList />} />
      <Route path='/edit/:employeeID' element={<EditEmployee/>}/>
    </RouterProvider>
  );
}

export default App;

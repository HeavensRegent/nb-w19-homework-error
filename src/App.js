import logo from './logo.svg';
import './App.css';
import EmployeeTable from './components/EmployeeTable';
import Header from './components/Header';
import API from './utils/API';
import { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import _ from 'lodash';

function App() {
  const [data, setData] = useState([]);
  let columns = [
    {field: 'name.first', header: 'First Name'},
    {field: 'name.last', header: 'Last Name'},
    {field: 'gender', header: 'Gender'},
    {field: 'login.username', header: 'Username'},
    {field: 'email', header: 'Email'},
    {field: 'phone', header: 'Phone Number'},
  ];
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(async () => {
    setData(await (await API.getUsers(30)).data.results)
  }, []);

  return (
    <Container>
      <Header search={setSearchTerm}/>
      <EmployeeTable columns={columns} data={data} searchTerm={searchTerm}/>
    </Container>
  );
}

export default App;

import 'babel-polyfill';

import React from 'react'; // Import React
import { render } from 'react-dom'; // Import render method
import Datatable from 'react-bs-datatable'; // Import this package
import faker from 'faker'; // Import faker to mock datas

import 'style.scss'; // For Webpack users

function getSlug(string) {
  return string.toLowerCase()
    .replace(/ +/g,'-')
    .replace(/.+/g,'');
}

const header = [
  { title: 'Username', prop: 'username', sortable: true, filterable: true },
  { title: 'Name', prop: 'realname', sortable: true },
  { title: 'Location', prop: 'location' },
  { title: 'Score', prop: 'score', sortable: true, filterable: true }
];

let body = [];

for (let i = 0; i < 500; i++) {
  const name = faker.name.findName();

  body.push(
    {
      username: (
        <a href="">{getSlug(name)}</a>
      ),
      realname: name,
      location: faker.address.streetAddress(),
      score: Math.ceil(Math.random() * 100)
    }
  );
}

render(
  <Datatable
    tableHeader={header}
    tableBody={body}
    keyName="userTable"
    tableClass="striped hover responsive"
    rowsPerPage={5}
    rowsPerPageOption={[25, 10, 15, 20]}
    initialSort={{prop: "username", isAscending: true}}
  />,
  document.getElementById('react-test')
);
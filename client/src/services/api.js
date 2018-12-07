import axios from 'axios';

const jsonApi = 'application/json';
axios.defaults.headers.common.Accept = jsonApi;
axios.defaults.headers['Content-Type'] = jsonApi;
axios.defaults.headers.put['Content-Type'] = jsonApi;
axios.defaults.headers.post['Content-Type'] = jsonApi;

// const api = axios.create({
//     baseURL: ROOT_URL,
// });

const apiPrefix = '/api/';

function apiTest() {
  return axios.get(`${apiPrefix}test`);
}

function getForumById(id, page = 1) {
  return axios.get(`${apiPrefix}forums/${id}/${page}`);
}

function getTopicById(id, page = 1) {
  return axios.get(`${apiPrefix}topics/${id}/${page}`);
}

function getUserById(id) {
  return axios.get(`${apiPrefix}users/${id}`);
}

function getForumList() {
  return [
    { id: 96, title: 'Canon - Biete' },
    { id: 114, title: 'Zubehör - Biete' },
    { id: 109, title: 'Sony - Biete' },
    { id: 118, title: 'Canon - Allgemein' },
    { id: 12, title: 'Canon - Objektive' },
    { id: 103, title: 'Canon - Zubehör' },
    { id: 258, title: 'Canon - EOS R' },
  ];
}

export {
  apiTest,
  getForumById,
  getTopicById,
  getUserById,
  getForumList,
};

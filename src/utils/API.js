import axios from "axios";

export default {
  getUsers: async function(results) {
    return await axios.get('https://randomuser.me/api/' + (results ? `?results=${results}` : ''));
  }
};

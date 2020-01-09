const backend = "/api/";
// https://infinite-thicket-17097.herokuapp.com/ | https://git.heroku.com/infinite-thicket-17097.git
//const backend = "http://localhost:5000/api/";
const config = {
    backend: backend,
    userApi: {
        find: (email) => `${backend}users/${email}`,
        particularUser: (id) => `${backend}users/${id}`
    }
};

export default config;
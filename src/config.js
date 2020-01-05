const backend = "http://localhost:5000/api/";
const config = {
    backend: backend,
    userApi: {
        find: (email) => `${backend}users/${email}`,
        particularUser: (id) => `${backend}users/${id}`
    }
};

export default config;
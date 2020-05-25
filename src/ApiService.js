import axios from 'axios';

const ApiService = {
    ListaAutores: async () => {
        const resp = await axios.get('http://localhost:8000/api/autor');
        return resp.data;
    },
    CriaAutor: async (autor) => {
        const resp = await axios.post('http://localhost:8000/api/autor', autor);
        return resp.data;
    },
    RemoveAutor: async (id) => {
        const resp = await axios.delete(`http://localhost:8000/api/autor/${id}`);
        return resp.data;
    }
}

export default ApiService;
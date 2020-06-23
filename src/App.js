import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [respositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'teste',
      url: 'http://teste.com.br',
      techs: ['NodeJS','ReactJS','React-Native']
    });

    setRepositories([
      ...respositories,
      response.data
    ]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    // console.log(response);

    if (response.status == 204) {
      // console.log('filtra');
      setRepositories(respositories.filter(item => item.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {respositories.map(repo => (
          <li key={repo.id}>

          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
          </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

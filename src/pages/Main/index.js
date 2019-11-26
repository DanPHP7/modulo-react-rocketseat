import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Container from '../../components/Container';
import { Form, SubmitButton, List, Message } from './styles';

class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: null,
    message: '',
  };

  // Carregar dados do localstorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Salvar dados no localstorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    try {
      const { newRepo, repositories } = this.state;
      if (newRepo === '')
        throw new Error('Você Precisa Informar um repositório');

      const isDuplicated = repositories.find(repo => repo.name === newRepo);

      if (isDuplicated) throw new Error('Este repositório já está na lista.');

      this.setState({ loading: true });
      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        loading: false,
        error: false,
        message: '',
      });
    } catch (error) {
      this.setState({
        loading: false,
        error: true,
        newRepo: '',
        message:
          error.message === 'Request failed with status code 404'
            ? 'Repositório não encontrado.'
            : error.message,
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleDelete = repository => {
    const { repositories } = this.state;

    const filter = repositories.filter(repo => repo.name !== repository);

    this.setState({
      repositories: [...filter],
    });
  };

  render() {
    const { newRepo, loading, repositories, error, message } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>
        <Message>{message}</Message>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <div>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  Detalhes
                </Link>
                <FaTrash
                  color="#f00"
                  size={14}
                  onClick={() => this.handleDelete(repository.name)}
                />
              </div>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;

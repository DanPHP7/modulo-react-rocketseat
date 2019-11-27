import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaSpinner, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  Loading,
  Owner,
  IssueList,
  Pagination,
  IssueFilter,
  LoadIssue,
  Label,
} from './styles';
import Container from '../../components/Container';
import api from '../services/api';
// import { Container } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    filters: [
      { state: 'all', label: 'Todas', active: true },
      { state: 'open', label: 'Abertas', active: false },
      { state: 'closed', label: 'Fechadas', active: false },
    ],
    page: 1,
    indexOfFilter: 0,
    repoName: '',
    loadIssue: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { filters } = this.state;

    const repoName = decodeURIComponent(match.params.repository);
    await this.setState({
      loadIssue: true,
    });
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filters.find(filter => filter.active).state,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
      loadIssue: false,
      repoName,
    });
  }

  getIssues = async () => {
    const { filters, page, indexOfFilter, repoName } = this.state;
    await this.setState({
      loadIssue: true,
    });
    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters[indexOfFilter].state,
        per_page: 5,
        page,
      },
    });

    this.setState({
      issues: issues.data,
      loadIssue: false,
    });
  };

  handleFilter = async indexOfFilter => {
    await this.setState({ indexOfFilter });
    this.getIssues();
  };

  handlePage = async action => {
    const { page } = this.state;
    await this.setState({
      page: action === 'back' ? page - 1 : page + 1,
    });
    this.getIssues();
  };

  render() {
    const {
      repository,
      issues,
      loading,
      filters,
      page,
      loadIssue,
      indexOfFilter,
    } = this.state;

    if (loading) {
      return (
        <Loading>
          <FaSpinner color="#FFF" size={30} />;
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">
            <FaArrowLeft color="#16457f" size={16} />
            Voltar aos repositórios
          </Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <center>
            <span>Issues</span>
          </center>
          <IssueFilter active={indexOfFilter} disabled={issues.length >= 5}>
            {filters.map((filter, index) => (
              <button
                type="button"
                key={filter.label}
                onClick={() => this.handleFilter(index)}
              >
                {filter.label}
              </button>
            ))}
          </IssueFilter>

          {loadIssue && issues.length > 0 ? (
            <LoadIssue>
              <FaSpinner color="#16457f" size={30} />;
            </LoadIssue>
          ) : (
            issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login} />
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {/* LABELS */}
                    {issue.labels.map(label => (
                      <Label
                        background={`#${label.color}`}
                        key={String(label.id)}
                      >
                        {label.name}
                      </Label>
                    ))}
                  </strong>
                  <p>{issue.user.login}</p>
                </div>
              </li>
            ))
          )}
        </IssueList>
        <Pagination>
          <button
            type="button"
            disabled={page < 2}
            onClick={() => this.handlePage('back')}
          >
            <FaArrowLeft color="#FFF" size={16} />
          </button>
          <span>{page}</span>
          <button
            type="button"
            disabled={!(issues.length >= 5)}
            onClick={() => this.handlePage('next')}
          >
            <FaArrowRight color="#FFF" size={16} />
          </button>
        </Pagination>
      </Container>
    );
  }
}

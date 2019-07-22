import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import ProjectsActions from '../../store/ducks/projects';
import MembersActions from '../../store/ducks/members';

import Can from '../Can';
import Modal from '../Modal';
import Members from '../Members';
import Button from '../../styles/components/Button';
import { Container, Project } from './styles';

class Projects extends Component {
  static propTypes = {
    activeTeam: PropTypes.shape({
      name: PropTypes.string,
    }),
    projects: PropTypes.shape({
      projectModalOpen: PropTypes.bool,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
        }),
      ),
    }),
    members: PropTypes.shape({
      membersModalOpen: PropTypes.bool,
    }).isRequired,
    getProjectsRequest: PropTypes.func.isRequired,
    createProjectRequest: PropTypes.func.isRequired,
    openProjectModal: PropTypes.func.isRequired,
    closeProjectModal: PropTypes.func.isRequired,
    openMembersModal: PropTypes.func.isRequired,
  };

  static defaultProps = {
    activeTeam: null,
    projects: null,
  };

  state = {
    newProject: '',
  };

  componentDidMount() {
    const { activeTeam, getProjectsRequest } = this.props;

    if (activeTeam) {
      getProjectsRequest();
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCreateProject = (e) => {
    e.preventDefault();

    const { createProjectRequest } = this.props;
    const { newProject } = this.state;

    createProjectRequest(newProject);
    this.setState({ newProject: '' });
  };

  handleCloseProjectModal = () => {
    const { closeProjectModal } = this.props;
    closeProjectModal();
    this.setState({ newProject: '' });
  };

  render() {
    const { newProject } = this.state;
    const {
      activeTeam, projects, openProjectModal, openMembersModal, members,
    } = this.props;

    if (!activeTeam) return null;
    return (
      <Container>
        <header>
          <h1>{activeTeam.name}</h1>
          <div>
            <Can checkPermission="projects_create">
              <Button onClick={openProjectModal}>+ Novo</Button>
            </Can>
            <Button onClick={openMembersModal}>Membros</Button>
          </div>
        </header>

        {projects.data.map(project => (
          <Project key={project.id}>
            <p>{project.title}</p>
          </Project>
        ))}

        {projects.projectModalOpen && (
          <Modal>
            <h1>Criar Projeto</h1>

            <form onSubmit={this.handleCreateProject}>
              <span>NOME</span>
              <input
                type="text"
                name="newProject"
                onChange={this.handleInputChange}
                value={newProject}
              />

              <Button size="big" type="submit">
                Salvar
              </Button>
              <Button size="small" color="gray" onClick={this.handleCloseProjectModal}>
                Cancelar
              </Button>
            </form>
          </Modal>
        )}

        {members.membersModalOpen && <Members />}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  activeTeam: state.teams.active,
  projects: state.projects,
  members: state.members,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...ProjectsActions,
    ...MembersActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Projects);

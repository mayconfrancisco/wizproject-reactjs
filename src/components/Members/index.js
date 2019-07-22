import React, { Component } from 'react';
import Select from 'react-select';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import api from '../../services/api';

import MembersActions from '../../store/ducks/members';

import Can from '../Can';
import Modal from '../Modal';
import Button from '../../styles/components/Button';
import { MembersList, Invite } from './styles';

class Members extends Component {
  static propTypes = {
    closeMembersModal: PropTypes.func.isRequired,
    getMembersRequest: PropTypes.func.isRequired,
    updateMemberRequest: PropTypes.func.isRequired,
    inviteMemberRequest: PropTypes.func.isRequired,
    members: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          user: PropTypes.shape({
            name: PropTypes.string,
          }),
          roles: PropTypes.arrayOf(
            PropTypes.shape({
              id: PropTypes.number,
              name: PropTypes.string,
            }),
          ),
        }),
      ),
    }).isRequired,
  };

  state = {
    invite: '',
    roles: [],
  };

  async componentDidMount() {
    const { getMembersRequest } = this.props;
    getMembersRequest();

    // Usamos apenas nestes componente - por isso nao criamos duck
    const response = await api.get('roles');
    this.setState({ roles: response.data });
  }

  handleRoleChange = (id, roles) => {
    const { updateMemberRequest } = this.props;
    updateMemberRequest(id, roles);
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleInvite = (e) => {
    e.preventDefault();

    const { inviteMemberRequest } = this.props;
    const { invite } = this.state;

    inviteMemberRequest(invite);
  };

  render() {
    const { roles, invite } = this.state;
    const { closeMembersModal, members } = this.props;

    return (
      <Modal size="big">
        <h1>Membros</h1>

        <Can checkPermission="invites_create">
          <Invite onSubmit={this.handleInvite}>
            <input
              type="text"
              name="invite"
              placeholder="Convidar para o time"
              value={invite}
              onChange={this.handleInputChange}
            />
            <Button type="submit">Enviar</Button>
          </Invite>
        </Can>

        <form onSubmit={this.handleInvite}>
          <MembersList>
            {members.data.map(member => (
              <li key={member.id}>
                <strong>{member.user.name}</strong>

                <Can checkRole="administrator">
                  { can => (
                    <Select
                      isMulti
                      isDisabled={!can}
                      options={roles}
                      value={member.roles}
                      getOptionLabel={role => role.name}
                      getOptionValue={role => role.id}
                      onChange={value => this.handleRoleChange(member.id, value)}
                    />
                  ) }
                </Can>
              </li>
            ))}
          </MembersList>

          <Button onClick={closeMembersModal} filled={false} color="gray">
            Cancelar
          </Button>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  members: state.members,
});

const mapDispatchToProps = dispatch => bindActionCreators(MembersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Members);

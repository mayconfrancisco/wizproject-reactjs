import { all, takeLatest, fork } from 'redux-saga/effects';

import {
  signIn, signOut, signUp, getPermissions,
} from './auth';
import { AuthTypes } from '../ducks/auth';

import { getTeams, createTeam } from './teams';
import { TeamsTypes } from '../ducks/teams';

import { getProjects, createProject } from './projects';
import { ProjectsTypes } from '../ducks/projects';

import { getMembers, updateMember, inviteMember } from './members';
import { MembersTypes } from '../ducks/members';

export default function* rootSaga() {
  return yield all([
    // fork executa quando o saga for inicializado
    fork(getPermissions),

    takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGN_OUT, signOut),
    takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),

    takeLatest(TeamsTypes.GET_TEAMS_REQUEST, getTeams),
    takeLatest(TeamsTypes.CREATE_TEAM_REQUEST, createTeam),

    // TODO MAYCON - ouvindo o select_team - sempre que trocar o time recarrega
    // os projetcs - nao preciso fazer isso pela tela
    takeLatest(TeamsTypes.SELECT_TEAM, getProjects),
    takeLatest(TeamsTypes.SELECT_TEAM, getPermissions),

    takeLatest(ProjectsTypes.GET_PROJECTS_REQUEST, getProjects),
    takeLatest(ProjectsTypes.CREATE_PROJECT_REQUEST, createProject),

    takeLatest(MembersTypes.GET_MEMBERS_REQUEST, getMembers),
    takeLatest(MembersTypes.UPDATE_MEMBER_REQUEST, updateMember),

    takeLatest(MembersTypes.INVITE_MEMBER_REQUEST, inviteMember),
  ]);
}

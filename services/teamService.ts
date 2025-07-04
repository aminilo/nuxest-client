import { api } from '~/utils/api';

export const getTeamMembers = ()=> api().get('/team');

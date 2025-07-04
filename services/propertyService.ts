import { api } from '~/utils/api';

export const getAllProperties = ()=> api().get('/properties');

export const getPropertyBySlug = (slug: string)=> api().get(`/properties/${slug}`);

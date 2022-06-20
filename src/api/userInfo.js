import client from './client';

export const getUserInfo = (id) => client.get(`/api/user/${id}`);

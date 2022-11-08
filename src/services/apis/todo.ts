import request from '../request';

import { TodoRequest } from '../../types/todo';

export const getTodoApi = async () => {
  return request({
    url: '',
    method: 'get',
  });
};

export const addTodoApi = async (body: TodoRequest) => {
  return request({
    url: '',
    method: 'post',
    data: body,
  });
};

export const updateTodoApi = async (id: string, body: TodoRequest) => {
  return request({
    url: `/${id}`,
    method: 'patch',
    data: body,
  });
};

export const deleteTodoApi = async (id: string) => {
  return request({
    url: `/${id}`,
    method: 'delete',
  });
};

import request from '../request';

export function search (data) {
  return request.post('/organization/userLog/search', data);
}

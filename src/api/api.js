export function loadUsers(id = '') {
   return fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => res.json());
}

export function loadTodos(id = '') {
   return fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`).then(res => res.json());
}

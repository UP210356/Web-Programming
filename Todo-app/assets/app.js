const userSelect = document.getElementById('select-users');
const userContainer = document.getElementById('user-container');
const taskContainer = document.getElementById('task-container');


document.addEventListener('DOMContentLoaded', function() {
  // Elementos HTML


  // Funciones
  /**
   * Obtiene una lista de todos los usuarios que pueden existir
   * @returns {Promise<User[]>}
   */
  function getAllUsers() {
    return fetch("data/usuarios.json")
      .then(resp => resp.json());
  }

  /**
   * Obtiene una lista de todas las tareas que hay de todos los usuarios
   * @returns {Promise<Task[]>}
   */
  function getAllTasks() {
    return fetch("data/tareas.json")
      .then(resp => resp.json());
  }

  /**
   * Muestra la información del usuario seleccionado
   * @param {User} user El usuario seleccionado
   */
  function displayUserInfo(user) {
    const userInfoHTML = `
      <h3>Información del usuario seleccionado</h3>
      <ul>
        <li>Nombre completo: ${user.firstname} ${user.lastname}</li>
        <li>Email: ${user.email}</li>
      </ul>
    `;
    userContainer.innerHTML = userInfoHTML;
  }

  /**
   * Muestra las tareas del usuario seleccionado
   * @param {Task[]} tasks Las tareas del usuario seleccionado
   */
  function displayUserTasks(tasks) {
    const tasksHTML = tasks.map(task => {
      return `
        <li>
          <span>${task.title}</span>
          <input type="checkbox" ${task.completed ? 'checked' : ''}>
        </li>
      `;
    }).join('');

    const tasksListHTML = `
      <h3>Lista de tareas del usuario</h3>
      <ul>
        ${tasksHTML}
      </ul>
    `;
    taskContainer.innerHTML = tasksListHTML;
  }

  // Event listener para el cambio de selección en el dropdown menu
  userSelect.addEventListener('change', function() {
    const selectedUserId = parseInt(this.value);
    getAllUsers()
      .then(users => {
        const selectedUser = users.find(user => user.id === selectedUserId);
        if (selectedUser) {
          displayUserInfo(selectedUser);
          return getAllTasks(); // Obtener las tareas una vez que se ha seleccionado el usuario
        } else {
          userContainer.innerHTML = '<p>No se encontró información para este usuario.</p>';
        }
      })
      .then(tasks => {
        if (tasks) {
          const userTasks = tasks.filter(task => task.userId === selectedUserId);
          displayUserTasks(userTasks);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });
});
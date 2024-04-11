import { getAllUsers } from './petitions.js';

const listUsers = document.getElementById('users');
const formTask = document.getElementById('task');

document.addEventListener('DOMContentLoaded', async () => {
  const users = await getAllUsers();

  let template = listUsers.innerHTML;
  for (const user of users) {
    template += `
      <option value="${user.id}">${user.fullname}</option>
    `;
  }

  listUsers.innerHTML = template;
});

async function fetchTasks() {
  try {
      const response = await fetch('/api/getTasks.php');
      if (!response.ok) {
          throw new Error('Fallo en la obtencion de tareas');
      }
      const tasks = await response.json();

      taskTableBody.innerHTML = '';

      tasks.forEach(task => {
          const row = `
              <tr>
                  <td>${task.id}</td>
                  <td>${task.idUser}</td>
                  <td>${task.title}</td>
                  <td>${task.compleTED}</td>
                  <td>
                      <button class="btn btn-secondary btn-sm btn-update" data-task-id="${task.id}">Update</button>
                      <button class="btn btn-danger btn-sm btn-delete" data-task-id="${task.id}">Delete</button>
                  </td>
              </tr>
          `;
          taskTableBody.insertAdjacentHTML('beforeend', row);
      });
  } catch (error) {
      console.error('Error:', error);
  }
}

formTask.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(formTask);
  const taskData = {
      title: formData.get('title'),
      userId: formData.get('idUser'),
      description: formData.get('compleTED')
  };

  try {
      const response = await fetch('/api/createTask.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(taskData)
      });

      if (response.ok) {
          await fetchTasks();
          formTask.reset();
      } else {
          console.error('Fallo en creación de tarea');
      }
  } catch (error) {
      console.error('Fallo en creación de tarea:', error);
  }
});


taskTableBody.addEventListener('click', async (e) => {
  const taskId = e.target.dataset.taskId;

  if (e.target.classList.contains('btn-update')) {
      console.log('Update task with ID:', taskId);
  } else if (e.target.classList.contains('btn-delete')) {
      try {
          const response = await fetch(`/api/deleteTask.php?id=${taskId}`, {
              method: 'DELETE'
          });

          if (response.ok) {
              await fetchTasks();
          } else {
              console.error('Fallo en borrar tarea');
          }
      } catch (error) {
          console.error('Fallo en borrar tarea:', error);
      }
  }
});

document.addEventListener('DOMContentLoaded', fetchTasks);

console.log(listUsers);
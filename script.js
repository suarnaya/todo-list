window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoForm = document.querySelector('#todo-form');

    // print value ke todo- list
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // create object, and store to todos array
        const todo = {
            content: e.target.elements.content.value,
            done: false,
        };

        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        if (todo.content.trim() !== null) {
            printTodo();
        }
    });

    printTodo();
});
const printTodo = () => {
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';

    // looping array yang menerima parameter object todos
    todos.forEach((todo) => {
        const todoItem = document.createElement('div');
        const check = document.createElement('input');
        const container = document.createElement('div');
        // const textArea = document.createElement('textarea');
        const action = document.createElement('div');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        todoItem.classList.add('todo-item');
        check.type = 'checkbox';
        container.classList.add('content-wrapper');
        action.classList.add('action');
        editBtn.textContent = 'edit';
        deleteBtn.textContent = 'delete';
        // textArea.setAttribute('readonly', true);

        container.innerHTML = `<textarea readonly">${todo.content.trim()}</textarea>`;

        // init check
        check.checked = todo.done;
        // add to textarea
        // textArea.textContent = todo.content.trim();

        action.appendChild(editBtn);
        action.appendChild(deleteBtn);
        todoItem.appendChild(check);
        todoItem.appendChild(container);
        todoItem.appendChild(action);

        todoList.appendChild(todoItem);

        if (todo.done) container.classList.add('striped');

        check.addEventListener('change', (e) => {
            // save check condition to done property of todo object
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.done) container.classList.add('striped');
            else container.classList.remove('striped');

            printTodo();
        });

        editBtn.addEventListener('click', () => {
            textArea = container.querySelector('textarea');
            textArea.removeAttribute('readonly');
            textArea.focus();
            textArea.addEventListener('blur', (e) => {
                textArea.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                printTodo();
            });
            // auto height text area
            textArea.style.height = `${textArea.scrollHeight}px`;
        });

        deleteBtn.addEventListener('click', () => {
            todos = todos.filter((t) => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            printTodo();
        });
        textArea.style.height = `${textArea.scrollHeight}px`;
    });
};

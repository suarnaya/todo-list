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

        // if no value, do nothing
        if (todo.content.trim() == '') {
            e.target.reset();
            return;
        }

        todos.unshift(todo);
        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();
        printTodo();
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
        const action = document.createElement('div');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        todoItem.classList.add('todo-item');
        check.type = 'checkbox';
        container.classList.add('content-wrapper');
        action.classList.add('action');
        editBtn.textContent = 'edit';
        deleteBtn.textContent = 'delete';

        container.innerHTML = `<textarea readonly>${todo.content.trim()}</textarea>`;

        // init check
        check.checked = todo.done;

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
            const textArea = container.querySelector('textarea');
            textArea.removeAttribute('readonly');
            textArea.focus();
            textArea.addEventListener('blur', (e) => {
                textArea.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                printTodo();
            });

            // auto height text area when input
            textArea.addEventListener('input', () => {
                textArea.style.height = `${textArea.scrollHeight}px`;
            });
        });

        deleteBtn.addEventListener('click', () => {
            todos = todos.filter((t) => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            printTodo();
        });

        // auto height textarea after blur event
        const textArea = container.querySelector('textarea');
        textArea.style.height = `${textArea.scrollHeight}px`;
    });
};

const todoForm = document.querySelector('#todo-form');

// print value ke todo- list
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const contentValue = e.target.elements.content.value;

    const printTodo = () => {
        const todoList = document.querySelector('#todo-list');

        const todoItem = document.createElement('div');
        const check = document.createElement('input');
        const content = document.createElement('div');
        const textArea = document.createElement('textarea');
        const action = document.createElement('div');
        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        todoItem.classList.add('todo-item');
        check.type = 'checkbox';
        content.classList.add('todo-content');
        textArea.setAttribute('readonly', true);
        action.classList.add('action');
        editBtn.textContent = 'edit';
        deleteBtn.textContent = 'delete';
        // add to textarea
        textArea.textContent = contentValue.trim();

        action.appendChild(editBtn);
        action.appendChild(deleteBtn);
        content.appendChild(textArea);
        todoItem.appendChild(check);
        todoItem.appendChild(content);
        todoItem.appendChild(action);

        todoList.appendChild(todoItem);

        check.addEventListener('change', () => {
            textArea.classList.toggle('striped');
        });

        editBtn.addEventListener('click', () => {
            textArea.removeAttribute('readonly');
            textArea.focus();
            textArea.addEventListener('blur', () =>
                textArea.setAttribute('readonly', true)
            );
        });

        deleteBtn.addEventListener('click', () => {
            todoItem.style.display = 'none';
        });

        //auto height text area
        textArea.style.height = `${textArea.scrollHeight}px`;
    };

    e.target.reset();
    if (contentValue.trim() !== '') {
        printTodo();
    }
});

const todoForm = document.querySelector('#todo-form')

// print value ke todo- list
todoForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const contentValue = e.target.elements.content.value

  const printTodo = () => {
    const todoList = document.querySelector('#todo-list')

    const todoItem = document.createElement('div')
    todoItem.classList.add('todo-item')

    const check = document.createElement('input')
    check.type = 'checkbox'

    const content = document.createElement('div')
    content.classList.add('todo-content')
    // content.innerHTML = `<input type="text" value="${contentValue}" readonly />`
    content.innerHTML = `<textarea readonly rows="1" >${contentValue}</textarea>`

    const action = document.createElement('div')
    action.classList.add('action')

    const editBtn = document.createElement('button')
    editBtn.textContent = 'Edit'

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'

    action.appendChild(editBtn)
    action.appendChild(deleteBtn)

    todoItem.appendChild(check)
    todoItem.appendChild(content)
    todoItem.appendChild(action)

    todoList.appendChild(todoItem)

    check.addEventListener('change', () => {
      content.firstChild.classList.toggle('striped')
    })

    editBtn.addEventListener('click', () => {
      const textArea = content.querySelector('textarea')
      textArea.removeAttribute('readonly')
      textArea.focus()
      textArea.addEventListener('blur', () =>
        textArea.setAttribute('readonly', true)
      )
    })

    deleteBtn.addEventListener('click', () => {
      todoItem.style.display = 'none'
    })
  }

  e.target.reset()
  if (contentValue !== '') {
    printTodo()
  }
})

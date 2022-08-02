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

    const textArea = document.createElement('textarea')
    textArea.setAttribute('readonly', true)
    textArea.textContent = contentValue

    const action = document.createElement('div')
    action.classList.add('action')

    const editBtn = document.createElement('button')
    editBtn.textContent = 'Edit'

    const deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'Delete'

    action.appendChild(editBtn)
    action.appendChild(deleteBtn)

    content.appendChild(textArea)

    todoItem.appendChild(check)
    todoItem.appendChild(content)
    todoItem.appendChild(action)

    todoList.appendChild(todoItem)

    check.addEventListener('change', () => {
      textArea.classList.toggle('striped')
    })

    editBtn.addEventListener('click', () => {
      textArea.removeAttribute('readonly')
      textArea.focus()
      textArea.addEventListener('blur', () =>
        textArea.setAttribute('readonly', true)
      )
    })

    deleteBtn.addEventListener('click', () => {
      todoItem.style.display = 'none'
    })

    //auto height text area
    textArea.style.height = `${textArea.scrollHeight}px`
  }

  e.target.reset()
  if (contentValue !== '') {
    printTodo()
  }
})

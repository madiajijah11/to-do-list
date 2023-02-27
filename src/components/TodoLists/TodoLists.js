import React, { useEffect, useState } from 'react'
import './TodoLists.css'
import { Image, Card, Col, Row, Button } from 'react-bootstrap'
import EmptyItem from '../../assets/background/empty-item.png'
import { BsTrash, BsPencil, BsArrowLeft } from 'react-icons/bs'
import { useParams, Link } from 'react-router-dom'
import AddListItem from '../AddListItem'
import http from '../../helpers/http'
import DeleteActivityOrList from '../DeleteActivityOrList'

const TodoLists = () => {
  const { id } = useParams()
  const [todos, setTodos] = useState([])
  const [show, setShow] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState({})

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleCloseDelete = () => setShowDelete(false)
  const handleShowDelete = () => setShowDelete(true)

  const fetchTodos = async () => {
    const { data } = await http().get(`/todo-items?activity_group_id=${id}`)
    setTodos(data.data)
  }

  useEffect(() => {
    fetchTodos()
  }, [id, show, showDelete])

  return (
    <div className='container'>
      <DeleteActivityOrList
        show={showDelete}
        handleClose={handleCloseDelete}
        id={selectedTodo.id}
        title={selectedTodo.title}
      />
      <AddListItem show={show} handleClose={handleClose} id={id} />
      <div className='header-content'>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <Button data-cy='todo-back-button'>
            <Link to='/' style={{ color: '#fff' }}>
              <BsArrowLeft />
            </Link>
          </Button>
          <h1 data-cy='todo-title'>Activity</h1>
          <Button data-cy='todo-title-edit-button'>
            <BsPencil />
          </Button>
        </div>
        <button
          data-cy='todo-add-button'
          onClick={() => handleShow()}
          className='btnTambah'
        >
          <i className='bi-plus' />
          Tambah
        </button>
      </div>
      {todos.length === 0 ? (
        <div data-cy='todo-empty-state' className='text-center'>
          <Image
            src={EmptyItem}
            alt='empty-todo'
            onClick={() => handleShow()}
          />
        </div>
      ) : (
        <Row xs={1} md={1} className='g-4 pb-5'>
          {todos.map((todo, index) => (
            <Col key={`todos_${todo.id}`}>
              <Card data-cy={`todo-item-${index}`} className='shadow-sm'>
                <Card.Body>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <Card.Title data-cy='todo-item-title'>
                      {todo.priority} - {todo.title}
                    </Card.Title>
                    <Button
                      data-cy='todo-item-delete-button'
                      onClick={() => {
                        setSelectedTodo(todo)
                        handleShowDelete()
                      }}
                    >
                      <BsTrash />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  )
}

export default TodoLists

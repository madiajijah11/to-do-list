import React, { useEffect, useState } from 'react'
import './TodoLists.css'
import { format } from 'date-fns'
import { Image, Card, Col, Row, Button } from 'react-bootstrap'
import EmptyItem from '../../assets/background/empty-item.png'
import { BsTrash, BsPencil, BsArrowLeft } from 'react-icons/bs'
import { useParams, Link } from 'react-router-dom'
import AddListItem from '../AddListItem'

const TodoLists = () => {
  const { id } = useParams()
  const [todos, setTodos] = useState([])
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const tambahActivity = async () => {
    const response = await fetch(
      'https://todo.api.devcode.gethired.id/activity-groups?email=madiajijah7@gmail.com',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: 'New Activity',
          email: 'madiajijah7@gmail.com'
        })
      }
    )
    const data = await response.json()
    setTodos(data.data)
  }

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch(
        `https://todo.api.devcode.gethired.id/todo-items?activity_group_id=${id}`
      )
      const data = await response.json()
      setTodos(data.data)
    }
    fetchTodos()
  }, [setTodos, id])

  return (
    <div className='container'>
      <AddListItem show={show} handleClose={handleClose} />
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
      {todos ? (
        <div data-cy='todo-empty-state' className='text-center'>
          <Image
            src={EmptyItem}
            alt='empty-todo'
            onClick={() => tambahActivity()}
          />
        </div>
      ) : (
        <Row xs={1} md={4} className='g-4 pb-5'>
          {todos?.map((todo, index) => (
            <Col key={`todos_${todo.id}`}>
              <Card data-cy={`todo-item-${index}`} className='shadow-sm'>
                <Card.Body>
                  <Card.Title data-cy='todo-item-title'>
                    {todo.title}
                  </Card.Title>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div data-cy='todo-item-date'>
                      {format(new Date(todo.created_at), 'dd MMMM yyyy')}
                    </div>
                    <Button data-cy='todo-item-delete-button'>
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

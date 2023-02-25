import React, { useEffect, useState } from 'react'
import './Content.css'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { format } from 'date-fns'

const Content = () => {
  const [todos, setTodos] = useState([])

  const fetchTodos = async () => {
    const response = await fetch(
      'https://todo.api.devcode.gethired.id/activity-groups?email=ivan@skyshi.com'
    )
    const data = await response.json()
    setTodos(data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className='container'>
      <div className='header-content'>
        <h1>Activity</h1>
        <button data-cy='activity-add-button' className='btnTambah'>
          <i className='bi-plus' />
          Tambah
        </button>
      </div>
      <Row xs={1} md={4} className='g-4'>
        {todos.data ? (
          todos.data.map(todo => (
            <Col key={`todos_${todo.id}`}>
              <Card>
                <Card.Body>
                  <Card.Title>{todo.title}</Card.Title>
                  <Card.Text>
                    {format(new Date(todo.created_at), 'dd MMMM yyyy')}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div>
            <button>+</button>
            <p>Buat activity pertamamu</p>
          </div>
        )}
      </Row>
    </div>
  )
}

export default Content

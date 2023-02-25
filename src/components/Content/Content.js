import React, { useEffect, useState } from 'react'
import './Content.css'
import { format } from 'date-fns'
import { Image, Card, Col, Row, Button } from 'react-bootstrap'
import EmptyActivity from '../../assets/background/empty-activity.png'
import { BsTrash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const Content = () => {
  const navigate = useNavigate()
  const [activity, setActivity] = useState([])

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
    setActivity(data.data)
  }

  const hapusActivity = async id => {
    const response = await fetch(
      `https://todo.api.devcode.gethired.id/activity-groups/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const data = await response.json()
    setActivity(data.data)
  }

  useEffect(() => {
    const fetchActivity = async () => {
      const response = await fetch(
        'https://todo.api.devcode.gethired.id/activity-groups?email=madiajijah7@gmail.com'
      )
      const data = await response.json()
      setActivity(data.data)
    }
    fetchActivity()
  }, [])

  return (
    <div className='container'>
      <div className='header-content'>
        <h1 data-cy='activity-title'>Activity</h1>
        <button
          data-cy='activity-add-button'
          onClick={() => tambahActivity()}
          className='btnTambah'
        >
          <i className='bi-plus' />
          Tambah
        </button>
      </div>
      {activity?.length <= 0 ? (
        <div data-cy='activity-empty-state' className='text-center'>
          <Image
            src={EmptyActivity}
            alt='empty-activity'
            onClick={() => tambahActivity()}
          />
        </div>
      ) : (
        <Row xs={1} md={4} className='g-4 pb-5'>
          {activity?.map((todo, index) => (
            <Col key={`activity_${todo.id}`}>
              <Card data-cy={`activity-item-${index}`} className='shadow-sm'>
                <Card.Body>
                  <Card.Title
                    data-cy='activity-item-title'
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      navigate(`/activity/${todo.id}`)
                    }}
                  >
                    {todo.title}
                  </Card.Title>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div data-cy='activity-item-date'>
                      {format(new Date(todo.created_at), 'dd MMMM yyyy')}
                    </div>
                    <Button
                      data-cy='activity-item-delete-button'
                      onClick={() => hapusActivity(todo.id)}
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

export default Content

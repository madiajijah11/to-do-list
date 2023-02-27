import React, { useEffect, useState } from 'react'
import './Content.css'
import { format } from 'date-fns'
import { Image, Card, Col, Row, Button } from 'react-bootstrap'
import EmptyActivity from '../../assets/background/empty-activity.png'
import { BsTrash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import http from '../../helpers/http'
import DeleteActivityOrList from '../DeleteActivityOrList'

const Content = () => {
  const navigate = useNavigate()

  const [activity, setActivity] = useState([])
  const [show, setShow] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState({})

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const fetchActivity = async () => {
    const { data } = await http().get(
      '/activity-groups?email=madiajijah7@gmail.com'
    )
    setActivity(data.data)
  }

  useEffect(() => {
    fetchActivity()
  }, [])

  const tambahActivity = async () => {
    const { data } = await http().post(
      '/activity-groups?email=madiajijah7@gmail.com',
      {
        title: 'New Activity',
        email: 'madiajijah7@gmail.com'
      }
    )
    setActivity(data.data)
    fetchActivity()
  }

  return (
    <>
      <DeleteActivityOrList
        show={show}
        handleClose={handleClose}
        id={selectedActivity.id}
        title={selectedActivity.title}
        activity={'activity'}
      />
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
                        onClick={() => {
                          setSelectedActivity(todo)
                          handleShow()
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
    </>
  )
}

export default Content

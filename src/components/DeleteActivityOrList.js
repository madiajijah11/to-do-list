import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import http from '../helpers/http'
import { BsFillExclamationTriangleFill } from 'react-icons/bs'

function DeleteActivityOrList ({ show, handleClose, id, title, activity }) {
  const hapusActivity = async () => {
    await http().delete(`/activity-groups/${id}`)
  }

  const hapusListItem = async () => {
    await http().delete(`/todo-items/${id}`)
  }

  return (
    <>
      <Modal show={show} onHide={handleClose} data-cy='modal-delete' centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <BsFillExclamationTriangleFill data-cy='modal-delete-icon' />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body data-cy='modal-delete-title'>
          Apakah anda yakun menghapus{' '}
          {activity === 'activity' ? 'activity' : 'List item'} "{title}"?
        </Modal.Body>
        <Modal.Footer>
          <Button
            data-cy='modal-delete-cancel-button'
            variant='secondary'
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            data-cy='modal-delete-confirm-button'
            variant='primary'
            onClick={() => {
              activity === 'activity' ? hapusActivity() : hapusListItem()
              handleClose()
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DeleteActivityOrList

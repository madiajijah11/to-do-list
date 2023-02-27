import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import http from '../helpers/http'

function AddListItem ({ show, handleClose, id }) {
  const [item, setItem] = useState({
    name: '',
    priority: ''
  })

  const handleSave = async () => {
    const response = await http().post('/todo-items', {
      activity_group_id: parseInt(id),
      title: item.name
    })
    if (response.status === 201) {
      handleClose()
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title data-cy='modal-add-title'>Tambah List Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label data-cy='modal-add-name-title'>
              NAMA LIST ITEM
            </Form.Label>
            <Form.Control
              data-cy='modal-add-name-input'
              type='text'
              placeholder='Tambahkan nama list item'
              onChange={e => setItem({ ...item, name: e.target.value })}
            />
            <Form.Label data-cy='modal-add-priority-title'>Priority</Form.Label>
            <Form.Select
              onChange={e => setItem({ ...item, priority: e.target.value })}
              data-cy='modal-add-priority-dropdown'
              aria-label='Pilih priority'
            >
              <option disabled>Pilih priority</option>
              <option data-cy='modal-add-priority-very-high' value='very-high'>
                Very High
              </option>
              <option data-cy='modal-add-priority-high' value='high'>
                High
              </option>
              <option data-cy='modal-add-priority-medium' value='medium'>
                Medium
              </option>
              <option data-cy='modal-add-priority-low' value='low'>
                Low
              </option>
              <option data-cy='modal-add-priority-very-low' value='very-low'>
                Very Low
              </option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          data-cy='modal-add-close-button'
          variant='secondary'
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          data-cy='modal-add-save-button'
          variant='primary'
          onClick={handleSave}
          disabled={item.name === ''}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AddListItem

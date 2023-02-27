import React from 'react'
import { Modal } from 'react-bootstrap'
import { BsFillExclamationCircleFill } from 'react-icons/bs'

function AlertActivity ({ showAlert }) {
  return (
    <Modal show={showAlert} data-cy='modal-information'>
      <Modal.Body>
        <BsFillExclamationCircleFill data-cy='data-information-icon' />
        <p data-cy='modal-information-title'>Activity berhasil dihapus</p>
      </Modal.Body>
    </Modal>
  )
}

export default AlertActivity

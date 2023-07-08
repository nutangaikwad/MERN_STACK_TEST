import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const DeactiveMessage = ({ show, onHide, AccountDeactivate }) => {

    return (
        <div >
            <Modal
                size="md"
                show={show}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <h6 className='ms-5 mt-3' style={{ width: '400px' }}
                >Are you sure ? delete this account.</h6>
                <Modal.Footer>
                    <Button onClick={onHide}>Close</Button>
                    <Button className='btn btn-danger btm-sm' onClick={AccountDeactivate}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DeactiveMessage

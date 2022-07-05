import React, { useState } from 'react'
import { addHours } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import Modal from 'react-modal/lib/components/Modal';

import "react-datepicker/dist/react-datepicker.css";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


Modal.setAppElement('#root');

export const CalModal = () => {

    const [isOpen, setIsOpen] = useState(true)
    const [ formValues, setFormValues] = useState({
        title: 'Titulo del evento',
        notes: 'Notas como contenido',
        start: new Date(),
        end: addHours(new Date(), 2)
    })

    const onCloseModal = () => {
        setIsOpen(false)
    }

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [ target.name ]: target.value
        })
    }

    const onDateChange = (event, changing) => {
        setFormValues({
            ...formValues,
            [ changing ]: event
        })
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            contentLabel="Example Modal"
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h2> Nuevo evento </h2>
            <hr />
            <form className="container">

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <ReactDatePicker
                        className="form-control" 
                        selected={ formValues.start }
                        onChange={ event => onDateChange(event, 'start') }
                        dateFormat="Pp"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <ReactDatePicker
                        className="form-control"
                        minDate={ formValues.start } 
                        selected={ formValues.end }
                        onChange={ event => onDateChange(event, 'end') }
                        dateFormat="Pp"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ formValues.title }
                        onChange={ onInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ formValues.notes }
                        onChange={ onInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}

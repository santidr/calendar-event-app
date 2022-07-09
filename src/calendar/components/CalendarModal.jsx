import React, { useEffect, useMemo, useState } from 'react'
import { addHours, differenceInSeconds } from 'date-fns';
import es from 'date-fns/locale/es';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import Swal from 'sweetalert2';
import Modal from 'react-modal/lib/components/Modal';

import "react-datepicker/dist/react-datepicker.css";
import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale('es', es)

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

export const CalendarModal = () => {

    const { activeEvent, startSavingEvent } = useCalendarStore()

    const [formSubmitted, setFormSubmitted] = useState(false)
    const [formValues, setFormValues] = useState({
        title: 'Titulo del evento',
        notes: 'Notas como contenido',
        start: new Date(),
        end: addHours(new Date(), 2)
    })

    const { isDateModalOpen, closeDateModal } = useUiStore()

    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDateChange = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setFormSubmitted(true)

        const difference = differenceInSeconds(formValues.end, formValues.start)

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Por favor, revise las fechas ingresadas', 'error')
            return
        }

        if (formValues.title.trim().length <= 0) return

        console.log(formValues)

        startSavingEvent(formValues)
        closeDateModal()
        setFormSubmitted(false)
    }

    const titleInvalid = useMemo(() => {
        if (!formSubmitted) return ''

        return (formValues.title.trim().length <= 0) ? 'is-invalid' : ''

    }, [formValues.title, formSubmitted])

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent)
        } 
    }, [ activeEvent ])


    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={closeDateModal}
            style={customStyles}
            contentLabel="Example Modal"
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h2> Nuevo evento </h2>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <ReactDatePicker
                        className="form-control"
                        selected={formValues.start}
                        onChange={event => onDateChange(event, 'start')}
                        dateFormat="Pp"
                        locale="es"
                        showTimeSelect
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <ReactDatePicker
                        className="form-control"
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={event => onDateChange(event, 'end')}
                        dateFormat="Pp"
                        locale="es"
                        showTimeSelect
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleInvalid}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
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
                        value={formValues.notes}
                        onChange={onInputChange}
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

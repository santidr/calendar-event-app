import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar, EventBox, CalendarModal, FabAddNew } from '../'
import { getMessagesES, localizer } from '../../helpers'
import { useState } from 'react'
import { useCalendarStore, useUiStore } from '../../hooks'
import { FabDelete } from '../components/FabDelete'

export const CalendarPage = () => {

  const { openDateModal } = useUiStore()
  const { events, setActiveEvent } = useCalendarStore()
  
  const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'agenda')

  const eventStyleGetter = () => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
    }

    return { style }
  }

  const onDoubleClick = (event) => {
    console.log({ onDoubleClick: event })
    openDateModal()
  }

  const onSelect = (event) => {
    setActiveEvent(event)
  }

  const onViewChange = (event) => {
    localStorage.setItem('lastView', event)
  }

  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <Calendar
          culture='es'
          localizer={localizer}
          events={events}
          defaultView={ lastView }
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 80px)' }}
          messages={ getMessagesES() }
          eventPropGetter={ eventStyleGetter }
          components={{
            event: EventBox
          }}
          onDoubleClickEvent={ onDoubleClick }
          onSelectEvent={ onSelect }
          onView={ onViewChange }
        />

        <CalendarModal />

        <FabAddNew />
        <FabDelete />
      </div>
    </>
  )
}
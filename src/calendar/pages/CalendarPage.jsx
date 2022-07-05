import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns'

import { Navbar, EventBox, CalModal } from '../'
import { getMessagesES, localizer } from '../../helpers'
import { useState } from 'react'

const eventList = [
  {
    title: 'Cumpleaños de Eiron',
    notes: 'Ir a comprar el bizcocho ahorita',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Kerbin',
    },
  }
]

export const CalendarPage = () => {

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
  }

  const onSelect = (event) => {
    console.log({ onSelect: event })
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
          events={eventList}
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

        <CalModal />
      </div>
    </>
  )
}
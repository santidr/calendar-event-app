import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store"

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar)
    const dispatch = useDispatch()

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = (calendarEvent) => {
        // TODO: when reaching the backend ...

        // Everything ok
        if (calendarEvent._id) {
            // Edit calendar event
            dispatch(onUpdateEvent({ ...calendarEvent }))
        } else {
            // Add new calendar event
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
        }
    }

    const startDeletingEvent = () => {
        // TODO: when reaching then backend...

        // Everhing ok
        dispatch(onDeleteEvent())
    }

    return {
        // Properties
        events,
        activeEvent,
        hasActiveEvent: !!activeEvent,

        // Methods
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
    }
}

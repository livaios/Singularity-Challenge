import React, { Component } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
const axios = require('axios')
const moment = require('moment')
const localizer = momentLocalizer(moment)
// const MomentRange = require('moment-range')
// const moment = MomentRange.extendMoment(Moment)

export class MyCalendar extends Component {
  constructor(props) {
    super(props)
    let start = new Date()
    let end = new Date()
    end.setMonth((end.getMonth() + 1) % 12)
    if (end.getMonth() === 0) {
      end.setFullYear(start.getFullYear() + 1)
    }
    this.state = {
      events: [],
      start,
      end,
      current_event: {
        id: undefined,
        title: undefined,
        recurrence: 'none',
        date: undefined,
      },
      show: false,
      edit: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange = (event) => {
    this.setState({
      current_event: {
        title: event.target.value,
        recurrence: this.state.current_event.recurrence,
        date: this.state.current_event.date,
        id: this.state.current_event.id,
      },
    })
  }
  handleChangeRec = (event) => {
    this.setState({
      current_event: {
        title: this.state.current_event.title,
        recurrence: event.target.value,
        date: this.state.current_event.date,
        id: this.state.current_event.id,
      },
    })
  }
  handleClose = () => {
    this.setState({
      current_event: {
        title: undefined,
        recurrence: 'none',
        date: undefined,
        id: undefined,
      },
      show: false,
    })
  }
  handleShow = () => {
    this.setState({
      show: true,
    })
  }
  handleSubmit = async () => {
    const edit = this.state.edit
    const { title, recurrence, date, id } = this.state.current_event
    if (!edit) {
      if (title) {
        await axios
          .post('http://localhost:5000/api/v1/calendar_entry/create', {
            title,
            recurrence,
            date,
          })
          .then((res) => {
            this.addEvent(date, date, title, recurrence, res.data.data._id)
            this.checkReccurence({
              date,
              title,
              recurrence,
              id: res.data.data._id,
            })
            alert(res.data.msg)
          })
      }
    } else {
      await axios
        .put('http://localhost:5000/api/v1/calendar_entry/update', {
          id,
          title,
          recurrence,
          date,
        })
        .then((res) => {
          this.setState({
            events: this.state.events.filter((event) => {
              return event.id !== id
            }),
          })
          this.addEvent(date, date, title, recurrence, id)
          this.checkReccurence({ date, title, recurrence, id })
          alert(res.data.msg)
        })
    }
    this.handleClose()
  }
  addEvent = (start, end, title, recurrence, id) => {
    let event = {
      start,
      end,
      title,
      recurrence,
      id,
    }
    this.setState({
      events: [...this.state.events, event],
    })
  }
  handleSelect = async (event) => {
    const { start } = event
    this.state.current_event.date = start
    this.state.edit = false
    this.handleShow()
  }
  handleEdit = async (event) => {
    const { start } = event
    this.state.edit = true
    this.state.current_event.date = start
    this.state.current_event.id = event.id
    this.state.current_event = {
      date: start,
      id: event.id,
      title: event.title,
      recurrence: event.recurrence,
    }
    this.handleShow()
  }
  onReset = async () => {
    await axios
      .delete('http://localhost:5000/api/v1/calendar_entry/reset')
      .then((res) => {
        this.setState({ events: [] })
        alert(res.data.msg)
      })
  }
  checkReccurence = (event) => {
    // let end_date = new Date(
    //   this.state.end.getFullYear(),
    //   this.state.end.getMonth(),
    //   0
    // )

    let curr_date
    // curr_days_in_month
    // let months

    curr_date = new Date(event.date)
    // curr_days_in_month = new Date(
    //   curr_date.getFullYear(),
    //   curr_date.getMonth(),
    //   0
    // ).getDate()
    // months = (end_date.getFullYear() - curr_date.getFullYear()) * 12
    // months -= curr_date.getMonth()
    // months += end_date.getMonth()
    // months = months <= 0 ? 1 : months
    switch (event.recurrence) {
      // case 'daily':
      //   for (let i = 1; i <= curr_days_in_month * months; i++) {
      //     // let new_day = new_date.getDate() + 1
      //     // let new_month = new_date.getMonth()
      //     // let new_year = new_date.getFullYear()
      //     // if (new_day > start_date) {
      //     //   new_month++
      //     //   new_day = 0
      //     // }
      //     // if (new_month > 11) {
      //     //   new_year++
      //     //   new_month = 0
      //     //   new_day = 0
      //     // }
      //     // new_date = new Date(new_year, new_month, new_day)
      //     let new_date = new Date(
      //       curr_date.getFullYear(),
      //       curr_date.getMonth(),
      //       curr_date.getDate() + i
      //     )
      //     this.addEvent(
      //       new_date,
      //       new_date,
      //       event.title,
      //       event.recurrence,
      //       event.id
      //     )
      //   }
      //   break
      // case 'weekly':
      //   let new_date = new Date(
      //     curr_date.getFullYear(),
      //     curr_date.getMonth(),
      //     curr_date.getDate()
      //   )

      //   for (let i = 1; i < curr_days_in_month / 7; i++) {
      //     new_date = new Date(
      //       curr_date.getFullYear(),
      //       curr_date.getMonth(),
      //       curr_date.getDate() + 7 * i
      //     )
      //     this.addEvent(
      //       new_date,
      //       new_date,
      //       event.title,
      //       event.recurrence,
      //       event.id
      //     )
      //   }
      //   break
      case 'monthly':
        {
          let new_date = new Date()
          if (curr_date.getMonth() < 11) {
            new_date = new Date(
              curr_date.getFullYear(),
              curr_date.getMonth() + 1,
              curr_date.getDate()
            )
          } else {
            new_date = new Date(
              curr_date.getFullYear() + 1,
              0,
              curr_date.getDate()
            )
          }
          this.addEvent(
            new_date,
            new_date,
            event.title,
            event.recurrence,
            event.id
          )
        }
        break
      case 'yearly':
        if (
          curr_date.getFullYear() >= this.state.start.getFullYear() &&
          curr_date.getFullYear() <= this.state.end.getFullYear() &&
          (curr_date.getMonth() === this.state.start.getMonth() ||
            curr_date.getMonth() === this.state.end.getMonth())
        ) {
          let new_date = new Date(
            curr_date.getFullYear() + 1,
            curr_date.getMonth(),
            curr_date.getDate()
          )
          this.addEvent(
            new_date,
            new_date,
            event.title,
            event.recurrence,
            event.id
          )
        }
        break
      default:
        break
    }
  }

  handleRangeChange = async (event) => {
    // this.setState({
    //   start: event.start,
    //   end: event.end,
    // })
    this.state.start = event.start
    this.state.end = event.end

    this.state.events.forEach((event) => {
      this.checkReccurence({
        date: event.start,
        recurrence: event.recurrence,
        title: event.title,
        id: event.id,
      })
    })
  }
  componentDidMount = async () => {
    let temp = []
    await axios
      .get('http://localhost:5000/api/v1/calendar_entry/getAll')
      .then((res) => {
        res.data.data.forEach((element) => {
          temp.push({
            title: element.title,
            start: element.date,
            end: element.date,
            recurrence: element.recurrence,
            id: element._id,
          })
          this.checkReccurence(element)
        })
        this.setState({
          events: [...this.state.events, ...temp],
        })
      })
  }

  render() {
    return (
      <div className='Calendar'>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Event</Modal.Title>
          </Modal.Header>
          <Form>
            <Form.Group controlId='formEvent'>
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter event title'
                value={this.state.current_event.title}
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group
              controlId='recurrence'
              value={this.state.current_event.recurrence}
            >
              <Form.Label>Select Recurrence</Form.Label>
              <Form.Control
                as='select'
                custom
                value={this.state.current_event.recurrence}
                onChange={this.handleChangeRec}
              >
                <option value='none'>None</option>
                {/* <option value='daily'>Daily</option> */}
                {/* <option value='weekly'>Weekly</option> */}
                <option value='monthly'>Monthly</option>
                <option value='yearly'>Yearly</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <Modal.Footer>
            <Button variant='secondary' onClick={this.handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={this.handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Button variant='danger' onClick={this.onReset}>
          Reset Events
        </Button>
        <Calendar
          localizer={localizer}
          startAccessor='start'
          endAccessor='end'
          defaultDate={new Date()}
          defaultView='month'
          views={['month']}
          events={this.state.events}
          selectable
          onSelectEvent={(event) => this.handleEdit(event)}
          onSelectSlot={(event) => this.handleSelect(event)}
          onRangeChange={async (event) => this.handleRangeChange(event)}
          style={{ height: '80vh' }}
        />
      </div>
    )
  }
}

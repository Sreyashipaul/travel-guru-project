import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Jumbotron, Row } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import fakeDatas from '../../fakeData/fakeData';

import DataInput from '../Error/DataInput';
import Header from '../header/Header';
const Booking = () => {const { id } = useParams();
const { bookingInfo, setBookingInfo } = useContext(UserContext);

const [formDate, setFormDate] = useState(new Date());
const [toDate, setToDate] = useState(new Date(Date.now() + 5 * 24 * 60 * 60 * 1000));
const history = useHistory();
const [booking, setBooking] = useState({
  location: {},
  origin: '',
  destination: ''
});

useEffect(() => {
  const bookingLocation = fakeDatas.find(location => location.id.toString() === id)
  setBooking(previousState => ({ ...previousState, location: bookingLocation, destination: bookingLocation.name }))

}, [id])

const onChangeHandler = e => {
  setBooking(previousState => ({ ...previousState, [e.target.name]: e.target.value }))
  e.persist()
}

const submitHandler = e => {
  setBookingInfo({ ...bookingInfo, ...booking, formDate, toDate })
  history.push(`/search/${id}`)
  e.preventDefault();
}

    return (
      <>
      <Header> </Header>
        <Container className="mt-5 pt-5">
        <Row>
          <Col sm={6} xl={6}>
            <Jumbotron className="bg-transparent px-0">
              <h1 className="font-weight-bold">{booking.location.name}</h1>
              <p>{booking.location.description}</p>
            </Jumbotron>
          </Col>
          <Col xl={1} />
          <Col sm={6} xl={5}>
            <Card>
              <Card.Body>
                <Form onSubmit={submitHandler} autoComplete="off">
                  <DataInput value={booking.origin}
                    onChangeHandler={onChangeHandler} name="origin" label="Origin" placeholder="Origin" autoFocus />
                  <DataInput value={booking.destination}
                    onChangeHandler={onChangeHandler} name="destination" placeholder="Destination" label="Destination" />
                  <Form.Row>
                    <DataInput label='Form' date={formDate} setDate={setFormDate} />
                    <DataInput label='To' date={toDate} setDate={setToDate} />
                  </Form.Row>
                  <Button className="w-100" variant="warning" type="submit">Start Booking</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </>
    );
};

export default Booking;
import React from 'react';
import { enGB } from 'date-fns/locale';
import 'react-nice-dates/build/style.css';
import {DatePicker} from 'react-nice-dates'; 
import { Col, Form } from 'react-bootstrap';
import {FiCalendar} from 'react-icons/fi';


const Data = ({ date, setDate, label }) => {
    return (
        <Form.Group as={Col}>
        <Form.Label className="form-title">{label}</Form.Label>
        <DatePicker date={date} onDateChange={setDate} locale={enGB}>
          {({ inputProps, focused }) => (
            <>
            <input
            
              className={'input form-control font-bold py-4' + (focused ? ' -focused' : '')}
              {...inputProps}
              
            /> 
            <FiCalendar />
            </>
  
          )}
        </DatePicker>
      </Form.Group>
    );
};

export default Data;
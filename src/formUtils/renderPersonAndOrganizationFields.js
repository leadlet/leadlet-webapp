import React from 'react';
import { Async } from 'react-select';

import 'react-select/dist/react-select.css';
import {loadOrganization, loadPerson, loadPipeline, loadStage} from "./form.actions";
import {personService} from "../services/person.service";


const renderPerson =(props) => (
    <div className="form-group">
        <label>Person</label>
        <Async
            key={(props.organization.input.value && props.organization.input.value.value )|| 0}
            {...props.person.input}
            closeOnSelect={true}
            disabled={false}
            multi={false}
            placeholder="Pipeline"
            loadOptions={(input, callback)=>loadPerson(input, callback, props.organization.input.value)}
            removeSelected={true}
            resetValue={undefined}
            rtl={false}
            onChange={(value) => {
                props.person.input.onChange(value);
                personService.getById(value.value)
                    .then(
                        person => {
                            props.organization.input.onChange({value: person.organization.id, label: person.organization.name})
                        }
                    );
            }}
            value={props.person.input.value}
            simpleValue={false}
            onBlur={() => props.person.input.onBlur(props.person.input.value)}
        />
    </div>
)

const renderOrganization =(props) => (
    <div className="form-group">
        <label>Organization</label>
        <Async
            key={ (props.person.input.value && props.person.input.value.value)|| 0}
            {...props.organization.input}
            closeOnSelect={true}
            multi={false}
            placeholder="Organization"
            loadOptions={(input, callback)=>loadOrganization(input, callback)}
            removeSelected={true}
            rtl={false}
            onChange={props.organization.input.onChange}
            value={props.organization.input.value}
            simpleValue={false}
            onBlur={() => props.organization.input.onBlur(props.organization.input.value)}
        />
    </div>
)
const renderPersonAndOrganizationFields= (props) => {
  if( props.showPersonSelection && props.showOrganizationSelection){
      return [
          renderPerson(props),renderOrganization(props)
      ]
  } else if (props.showPersonSelection){
      return [
          renderPerson(props)
      ]
  } else if (props.showOrganizationSelection){
      return [
          renderOrganization(props)
      ]
  } else {
      return null;
  }

};



export default renderPersonAndOrganizationFields

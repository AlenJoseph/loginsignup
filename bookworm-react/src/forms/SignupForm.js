import React from 'react';
import PropTypes from 'prop-types';
import {Form,Button} from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from "../../src/components/messages/InlineError";

class SignupForm extends React.Component {
    state={
        data: {
            uname: '',
            email: '',
            password: ''
        },
        loading: false,
        errors: {}
    };
onChange = e =>
 this.setState({
     data: {...this.state.data,[e.target.name]: e.target.value}
    });

onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors});
    if(Object.keys(errors).length === 0){
    this.props.submit(this.state.data);
    }
}
validate = (data) => {
    const errors = {};
    if(!Validator.isAlphanumeric(data.uname))errors.uname = "Invalid Username"
    if(!Validator.isEmail(data.email)) errors.email = "Invalid Email";
    if(!data.password) errors.password = "Can't be blank";
    return errors;
}
render() {
    const { data,errors } = this.state;
  return (
    <Form style={{'position': 'relative','max-width': '50%', 'margin-left': '25%'}}onSubmit = {this.onSubmit}>
        <Form.Field>
            <label htmlFor="uname">UserName</label>
            <input type = "text"
              id="uname"
              name="uname"
              placeholder="Enter your username"
              value={data.uname}
              onChange={this.onChange}/>
            {errors.uname && <InlineError text={errors.uname}/>}
            </Form.Field>
        <Form.Field>
            <label htmlFor="email">Email</label>
            <input  type="email"
             id="email" 
             name="email"
             placeholder="example@example.com"
             value={data.email}
             onChange={this.onChange}/>
          {errors.email && <InlineError text={errors.email}/>}
          </Form.Field>
        <Form.Field>
            <label htmlFor="password">Password</label>
            <input 
            type="password"
            id="password" 
            name="password"
            placeholder="Make it Secure"
            value={data.password}
            onChange={this.onChange}
            />
            {errors.password && <InlineError text={errors.password}/>}
        </Form.Field>
      <Button style={{'margin-left': '43%'}} primary>Signup</Button>
    </Form>
  )
}
}
SignupForm.propTypes = {
  submit:PropTypes.func.isRequired
};

export default SignupForm;
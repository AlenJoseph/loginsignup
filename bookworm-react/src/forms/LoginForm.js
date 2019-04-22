import React from 'react';
import PropTypes from 'prop-types';
import {Form,Button} from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from "../../src/components/messages/InlineError";
import { Redirect } from 'react-router';

class LoginForm extends React.Component {
    state={
        data: {
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
    localStorage.setItem('email',this.state.data.email);
    localStorage.setItem('password',this.state.data.password);
    let uemail=localStorage.getItem('email');
    let upassword=localStorage.getItem('password')
    if((uemail === 'punithnandiraj@gmail.com')&&(upassword=== 'abcdefg')){
     this.setState({loading:true})
    

    }
}
validate = (data) => {
    const errors = {};
    if(!Validator.isEmail(data.email)) errors.email = "Invalid Email";
    if(!data.password) errors.password = "Can't be blank";
    return errors;
}
  render() {
      const { data,errors } = this.state;
      if (this.state.loading === true) {
        return <Redirect to='/dashboard' />
      }
  
    return (
      <Form style={{'position': 'relative','max-width': '50%', 'margin-left': '25%'}}onSubmit = {this.onSubmit}>
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
        <Button style={{'margin-left': '43%'}} primary>Login</Button>
      </Form>
    )
  }
}
 LoginForm.propTypes = {
    submit:PropTypes.func.isRequired
};

export default LoginForm;

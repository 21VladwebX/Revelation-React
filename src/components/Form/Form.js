import React, { Component } from 'react';

import './Form.css';

class Form extends Component {

  constructor(props){
    super(props)
    this.validate = this.validate.bind(this);

    this.state = ({
      error: ''
    })
  }

  validate(e){
    e.preventDefault();
    // console.log(e.target);
    let error = "";
    let firstName = e.target[0].value;
    let secondName = e.target[1].value;
    let email = e.target[2].value;
    let pass = e.target[3].value;
    console.log(firstName.length);
    let rePass = e.target[4].value;
    error += firstName.length <= 3 ? 'Length of first name is too small.' : '';
    error += secondName.length <= 3 ? 'Length of second name is too small.' : '';
    error += pass.length <= 3 ? 'Length of password name is too small. \n' : '';
    error += pass !== rePass ? 'Passwords are different. \n' : '';
    console.log(error);
    this.setState({
      error: error
    })
    if(!error){
      console.log(`no error`);
    }
  }

  render() {
    return (
      <div className="Form">
        <form action="" method="post" onSubmit={this.validate}>
          <label htmlFor="firstName">Your`s first name</label>
          <input type="text" name="firstName" id="firstName"/>
          <lable htmlFor="secondName">Your`s second name</lable>
          <input type="text" name="secondName" id="secondName"/>
          <lable htmlFor="email">Your`s email</lable>
          <input type="email" name="email" id="email"/>
          <lable htmlFor="password">Your`s password</lable>
          <input type="password" name="password" id="password"/>
          <lable htmlFor="repPass">Repeat your`s password</lable>
          <input type="password" name="repPass" id="repPass"/>
          <button type="submit"> Submit </button>
          <div className="error">
            <span>{this.state.error}</span>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;

import React, { Component } from 'react';

import './Form.css';

class Form extends Component {

  constructor(props){
    super(props)
    this.validate = this.validate.bind(this);

    this.state = ({
      error: [],
      name: '',
      surname: '',
      reg: false
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
    let data =[];
    let rePass = e.target[4].value;

    error += firstName.length <= 2 ? data.push('Length of first name is too small.'): '';
    error += secondName.length <= 3 ? data.push('Length of second name is too small.') : '';
    error += pass.length <= 3 ? data.push('Length of password name is too small.') : '';
    error += pass !== rePass ? data.push('Passwords are different.') : '';
    this.setState({
      error: data
    });
    if(!error){
      let jsn = {
        'firstName': firstName,
        'secondName': secondName,
        'email': email,
        'password': pass
      };
      let data = JSON.stringify(jsn);

      fetch('http://localhost:3000',{
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: data
      })
        .then(data => {

          if(data.status === 200){
            this.setState({
              reg: true
            });
          }

          this.getServerInfo();
        })
    }
  }
  getServerInfo(e){
    fetch('http://localhost:3000',{
      method: "GET"
    })
      .then(response => response.json())
      .then(section => {
        let data = JSON.parse(section);
        this.setState({
          name: data.name,
          surname: data.surname
        })
      });
  }
  render() {
    let info ='';
    if(this.state.name){
      info = <div className="info">
        <span> Your name is "{this.state.name}"</span>
        <span> Your second name is "{this.state.surname}"</span>
      </div>;
    }
    return (
      <div className="Form">
        <form action="/" method="post" onSubmit={this.validate}>
          <label className="label" htmlFor="firstName">Your`s first name</label>
          <input type="text" name="firstName" id="firstName" placeholder="First name:"/>
          <lable className="label" htmlFor="secondName">Your`s second name</lable>
          <input type="text" name="secondName" id="secondName" placeholder="Second name:"/>
          <lable className="label" htmlFor="email">Your`s email</lable>
          <input type="email" name="email" id="email" placeholder="Email:"/>
          <lable className="label" htmlFor="password">Your`s password</lable>
          <input type="password" name="password" id="password" placeholder="Password:"/>
          <lable className="label" htmlFor="repPass">Repeat your`s password </lable>
          <input type="password" name="repPass" id="repPass" placeholder="Password:"/>
          <button type="submit"> Submit </button>
          <div className="error">
            {this.state.error.map((item,key) => {
              return <span key={key}>{item} </span>
            })}
          </div>
        </form>
        {info}
      </div>
    );
  }
}

export default Form;

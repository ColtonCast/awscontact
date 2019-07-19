import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  container: {
    row: 'center',
    alignItems: 'center',
    justify: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    margin: 'auto'
  },
  textField: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    width: 200,
  },
  button: {
    margin: theme.spacing(5),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  }
}));

function emailIsValid (email) {
  if (/\S+@\S+\.\S+/.test(email) !== true ) {
    console.log("invalid email")
  }
} //apply this

export default function TextFieldMargins(props) {
  const classes = useStyles();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const data = {name, email, message}
    emailIsValid(email)

    fetch('https://excorb1092.execute-api.us-east-2.amazonaws.com/beta/myRestService', {
    method: 'POST',
    headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({data}),
}).then(r =>  r.json()
  .then(data => ({status: r.status, body: data})))
  .then(obj => console.log(obj));
  }

return ( 
<div className="blackbox">
  <h1 className="h1m"> Please leave us a message!</h1>
  <div className="formbox">
    <div className={classes.container}>
      <TextField   
        variant="outlined"
        label="Name"
        id="Name_field"
        placeholder="Please enter your name"
        className={classes.textField}
        helperText="Help us get to know you!"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <TextField
        variant="outlined"
        label="Email"
        id="Email_field"
        placeholder="Valid Email"
        className={classes.textField}
        helperText="How can we reach you?"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        variant="outlined"
        label="Message"
        id="Message_field"
        placeholder="Message"
        className={classes.textField}
        helperText="What can we help you with?"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <Button onClick={handleSubmit} variant="contained" color="primary" className={classes.button}>
        Send
        <Icon className={classes.rightIcon}>send</Icon>
      </Button>
    </div>
  </div>
</div>
);
}
import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component {
   constructor(props) {
   super(props);

   }

   render(){
     return (
       <div style={styles.welcomeDiv}>
        <div style={styles.text}>Hello React.js and JSX World!</div>
      </div>
     )
   }
 }

document.addEventListener('DOMContentLoaded', function(){
  ReactDOM.render(
      <Hello />,
      document.getElementById('app')
  );
});

const styles = {
  welcomeDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },

  text: {
    fontSize: '40px',
    fontWeight: 'bold'
  }
}

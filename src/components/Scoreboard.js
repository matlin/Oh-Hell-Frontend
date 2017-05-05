import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../App.css'

//TODO sorting by score

class Scoreboard extends Component{
  constructor(props){
    super()
  }

  render(){

    let i = -1;
    const mytable = this.props.players.map((player)=>{
      i ++;
      return (
        <tr key={player._id}>
          <td>{player._id}</td>
          <td>{this.props.scores[i]}</td>
        </tr>);
    });

    return(
      <div id='our-table'>
      <table>
      <tbody>
      <tr>
      <th>Players</th>
      <th>Scores</th>
      </tr>
      {mytable}
      </tbody>
      </table>
      </div>
    );
  }
}

Scoreboard.propTypes = {
  players: PropTypes.array.isRequired,
  scores: PropTypes.array.isRequired,
}

export default Scoreboard;

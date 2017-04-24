import React from 'react';
import Sound from 'react-sound';
import SoundComponent from '../../bottom/sound_component';
import RightClickMenuContainer from '../../modal/right_click_menu_container';

class SongItem extends React.Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.state = {buttonStyle: "triangle-test"};
  }

  componentWillReceiveProps(newProps){
    let buttonStyle;
    if (newProps.currentSong && this.props.currentSong !== newProps.currentSong) {
      if (newProps.currentSongStatus.status === "PLAY") {
        buttonStyle = newProps.currentSong.id === this.props.song.id ? "pause" : "triangle-test";
        this.setState({buttonStyle: buttonStyle});
      } else if (newProps.currentSongStatus === "PAUSE") {
        this.setState({buttonStyle: "triangle-test"});
      }
    } else if (newProps.currentSong && this.props.currentSong === newProps.currentSong) {
      if (newProps.currentSongStatus.status === "PAUSE") {
        this.setState({buttonStyle: "triangle-test"});
      } else if (newProps.currentSongStatus === "PLAY") {
        this.setState({buttonStyle: "pause"});
      }
    }
  }

  handleClick(props){

    return (e) => {
      e.preventDefault();
      if (props.currentSongStatus.status === null) {
        this.handlePlay(props);
      } else if (props.currentSongStatus.status === "PLAY" && props.currentSong.id === props.song.id){
        this.handlePause(props);
      } else if (props.currentSongStatus.status === "PLAY" && props.currentSong.id !== props.song.id){
        this.handlePlay(props);
      } else if (props.currentSongStatus.status === "PAUSE"){
        this.handlePlay(props);
      }
    };
  }

  handlePlay(props){
    if (props.currentSongStatus.positionAndDuration && props.currentSong.id === props.song.id){
      props.playCurrentSong(props.currentSongStatus.positionAndDuration.position);
      this.setState({buttonStyle: "pause"});
    } else {
      props.removeCurrentSong();
      props.fetchSong(props.song.id);
      props.playCurrentSong(null);
      this.setState({buttonStyle: "pause"});
    }
  }

  handlePause(props){
    props.pauseCurrentSong();
    this.setState({buttonStyle: "triangle-test"});
  }

  handleRightClick(props){
    return (e) => {
      e.preventDefault();
      console.log("clicked");
      let el = e.currentTarget;
      // let el2 = document.getElementsByClassName('song-list-item')[props.idx];
      let menu = document.getElementById('right-click-menu-container');
      menu.style.display = "flex";
      el.appendChild(menu);
    };
  }


  render(){

    let props = this.props;

    return(
      <li className="song-list-item">

        <div className="song-item-play-btn-container">
          <button onClick={this.handleClick(props)}><div id={this.state.buttonStyle}></div></button>
        </div>

        <div className="song-item-order-container">
          <span id="song-order">{props.order}.</span>
        </div>

        <div className="song-item-song-name">
          <p onContextMenu={this.handleRightClick(props)}>{props.song.name}</p>
        </div>
        <RightClickMenuContainer />
      </li>
    );
  }

}


export default SongItem;

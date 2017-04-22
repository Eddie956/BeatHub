import { connect } from 'react-redux';
import Presentation from './presentation';
import { fetchAlbumSongs, fetchSong, removeCurrentSong } from '../../../actions/song_actions';
import { playCurrentSong, pauseCurrentSong, stopCurrentSong } from '../../../actions/current_song_actions';




const mapStateToProps = (state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    presentationInfo: ownProps.presentationInfo,
    songs: ownProps.songs,
    currentSong: ownProps.currentSong,
    currentSongStatus: state.currentSongStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAlbumSongs: (albumId) => dispatch(fetchAlbumSongs(albumId)),
    fetchSong: (songId) => dispatch(fetchSong(songId)),
    removeCurrentSong: () => dispatch(removeCurrentSong()),
    playCurrentSong: (positionAndDuration) => dispatch(playCurrentSong(positionAndDuration)),
    pauseCurrentSong: (positionAndDuration) => dispatch(pauseCurrentSong(positionAndDuration)),
    stopCurrentSong: (positionAndDuration) => dispatch(stopCurrentSong(positionAndDuration))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Presentation);
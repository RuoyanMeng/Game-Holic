import React, { Component } from "react";

import { Modal } from "antd";

class PlayStatusModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playStatus: this.props.playStatus,
      loading: false,
      visible: false,
      email: "",
      password: "",
      keyword: ''
    };
  }

  addListClick=(uid, playStatus)=> {
    
    this.setState({ visible: false });
    
    let briefGameInfo = {
      playStatus: playStatus,
      uid: uid,
      gameID: JSON.stringify(this.props.game.id),
      gameName: (this.props.game.name).toString() ,
      
    };
    if(this.props.game.cover){
      briefGameInfo.gameCover= this.props.game.cover
    }
    this.props.actions.addItemToList(briefGameInfo);
  }

  handleSignInChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  onChange = e => {
    this.setState({
      playStatus: e.target.value
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  handleSubmit = e => {
    e.preventDefault();
    let credentials = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.signIn(credentials);
  };



  render() {

    const { game, auth, playStatus, authError } = this.props
    const { visible, loading } = this.state;
    

    let playStatusModal = null;
    if (auth.isEmpty) {
      playStatusModal = (
        <div>
          <button id='button' className='f6 br3 dark-green no-underline ba grow pv2 ph3 dib' onClick={this.showModal}>
            {playStatus}
          </button>
          <Modal
            visible={visible}
            title="Game Holic"
            onCancel={this.handleCancel}
            footer={null}
          >
            <form onSubmit={this.handleSubmit} className="white">
              <div className="input-field mt3">
                <label htmlFor="email" className="db fw6 lh-copy f6">Email<br /></label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type="email"
                  id="email"
                  onChange={this.handleSignInChange}
                />
              </div>
              <div className="input-field mt3">
                <label htmlFor="password" className="db fw6 lh-copy f6">Password<br /></label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100'
                  type="password"
                  id="password"
                  onChange={this.handleSignInChange}
                />
              </div>
              <br />
              <br />
              <div className="mt0">
                <button className="b ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib">
                  Sign In
                    </button>
                <h5 className="white mt1">
                  Don't have an account? {this.props.signUp}
                </h5>
                <div className="center red-text">
                  {authError ? <p>{authError}</p> : null}
                </div>
              </div>

            </form>
          </Modal>
        </div>
      );
    } else {
      playStatusModal = (
        <div>
          <button id='button' className='f6 br3 dark-green no-underline ba grow pv2 ph3 dib' onClick={this.showModal}>
            {playStatus}
          </button>
          <Modal
            visible={visible}
            title="Add this game to..."
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <button className='white b ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib' onClick={this.handleCancel}>
                Return
                      </button>,
              <button
                className='b ph3 pv2 input-reset ba bg-transparent grow pointer f6 dib white'
                loading={loading}
                onClick={() =>
                  this.addListClick(auth.uid, this.state.playStatus)
                }
              >
                Submit
                      </button>
            ]}
          >

            <form className='white'>
              <div className="radio flex items-center mb1">
                <label>
                  <input className='mr2' type="radio" value="Wanna Play" checked={this.state.playStatus === 'Wanna Play'} onChange={this.onChange} />
                  Wanna Play
                        </label>
              </div>
              <div className="radio flex items-center mb1">
                <label>
                  <input className='mr2' type="radio" value="Playing" checked={this.state.playStatus === 'Playing'} onChange={this.onChange} />
                  Playing
                        </label>
              </div>
              <div className="radio flex items-center mb1">
                <label>
                  <input className='mr2' type="radio" value="Completed" checked={this.state.playStatus === 'Completed'} onChange={this.onChange} />
                  Completed
                        </label>
              </div>
              <div className="radio flex items-center mb1">
                <label>
                  <input className='mr2' type="radio" value="Abandoned" checked={this.state.playStatus === 'Abandoned'} onChange={this.onChange} />
                  Abandoned
                        </label>
              </div>
            </form>
          </Modal>
        </div>
      );
    }




    return (
      <div> {playStatusModal}</div>
     
    )
  }
}

export default PlayStatusModal;

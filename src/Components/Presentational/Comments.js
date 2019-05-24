import React, { Component } from "react";
import { Comment, Avatar, Form, Button, List, Input, Rate, Alert } from "antd";
import moment from "moment";
import PlayStatusModal from "./PlayStatusModal";
import profilePic from "../../img/profile.png";
import "../../Styles/comments.scss";

const TextArea = Input.TextArea;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, value, buttonComment, rateComponent }) => (
  <div>
    {rateComponent}
    <Form.Item>
      <TextArea
        rows={4}
        onChange={onChange}
        value={value}
        placeholder=" How do you think about this game? Please type your comments here..."
      />
    </Form.Item>
    <Form.Item>{buttonComment}</Form.Item>
  </div>
);

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [...this.props.commentList],
      submitting: false,
      value: "",
      rateValue: "",
      commentavatar: profilePic,
    };
  }

  componentWillUnmount = () => {
    //this.props.actions.resetState("COMMENT");
  };

  handleSubmit = () => {
    if (!this.state.value) {
      alert("Warning: the comments can not be empty before submitting!");
      return;
    }

    this.setState({
      submitting: true
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: "",
        comments: [
          {
            author: this.props.profile.userName,
            avatar: this.state.commentavatar,
            content: this.state.value,
            datetime: "Rating: " + this.state.rateValue + " ( " +moment().format("MMMM Do YYYY, h:mm:ss a") + " )"
          },
          ...this.state.comments
        ]
      });
    }, 200);

    let briefGameInfo = {
      playStatus: this.props.playStatus,
      uid: this.props.auth.uid,
      gameID: this.props.gameID,
      gameName: this.props.game.name.toString(),
      rate: this.state.rateValue
    };
    if (this.props.game.cover) {
      briefGameInfo.gameCover = this.props.game.cover;
    }

    setTimeout(() => {
      let commentInfo = {
        gameID: this.props.gameID,
        commentList: this.state.comments
      };
      //console.log(commentInfo.commentList);
      this.props.actions.addItemToList(briefGameInfo);
      this.props.actions.addComments(commentInfo);
    }, 1500);
  };

  handleRateChange = rateValue => {
    console.log(this.state.rateValue);
    this.setState({
      rateValue: rateValue
    });
  };

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { comments, submitting, value, rateValue} = this.state;
    const { signUp, signIn, auth, authError, rate } = this.props;

    console.log(this.props.gameID);
    let buttonComment = null;

    if (auth.isEmpty) {
      buttonComment = (
        <PlayStatusModal
          playStatus={"Add Comment"}
          auth={auth}
          authError={authError}
          signUp={signUp}
          signIn={signIn}
        />
      );
    } else {
      buttonComment = (
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={this.handleSubmit}
          type="primary"
        >
          Add Comment
        </Button>
      );
    };

  
    let rateComponent = (
      <Form.Item>
        <Rate
          // allowClear={true}
          allowHalf
          onChange={value => {
            this.handleRateChange(value);
          }}
          // defaultValue={rate}
          defaultValue={0}
        />
      </Form.Item>
    );

    return (
      <div className="game-comment">
        {comments.length > 0 && <CommentList comments={comments} />}      
        <Comment
          id="comment-area"
          avatar={<Avatar src={profilePic} />}
          content={
            <Editor
              rateComponent={rateComponent}
              onChange={this.handleChange}
              value={value}
              rateValue={rateValue}
              buttonComment={buttonComment}
            />
          }
        />
      </div>
      
    );
  }
}

export default Comments;

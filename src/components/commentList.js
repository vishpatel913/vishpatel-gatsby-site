import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import moment from "moment";

import { capitalizeString } from "../utils/helpers";

const CommentListContainer = styled.div`
  display: block;
  margin: 0;
  margin-bottom: 2rem;
`;

const ListContainer = styled.ul`
  margin: 0;
`;

const CommentContainer = styled.li`
  display: block;
  margin-bottom: 1.5rem;
`;

const CommentHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const CommentTitle = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 4px solid ${({ theme }) => theme.color.primary};
  padding-left: 1em;
`;

const CommentMessage = styled.div`
  display: block;
`;

const Comment = ({ author, time, message }) => {
  const date = moment(time * 1000).format("D MMM 'YY");
  const authorDisplay = capitalizeString(author);

  return (
    <CommentContainer>
      <CommentHeader>
        <CommentTitle>
          <strong>{authorDisplay}</strong>
          {date}
        </CommentTitle>
      </CommentHeader>
      <CommentMessage>{message}</CommentMessage>
    </CommentContainer>
  );
};

Comment.propTypes = {
  author: PropTypes.string,
  time: PropTypes.number,
  message: PropTypes.string
};

const CommentList = ({ data }) => {
  const comments = data.map(({ node }) => (
    <Comment
      key={node.timestamp}
      author={node.name}
      time={node.timestamp}
      message={node.message.message}
    />
  ));

  return (
    <CommentListContainer>
      <h2>
        {`${comments.length} `}
        Comment
        {comments.length !== 1 && "s"}
      </h2>
      <ListContainer>{comments}</ListContainer>
    </CommentListContainer>
  );
};

export default CommentList;

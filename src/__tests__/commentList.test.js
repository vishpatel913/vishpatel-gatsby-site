import React from "react";
import renderer from "react-test-renderer";
import CommentList from "../components/commentList";

describe("CommentList", () => {
  let mockData;

  beforeEach(() => {
    mockData = [{
      node: {
        name: "tester",
        message: {
          message: "testing"
        },
        timestamp: 1519308700
      }
    }];
  });

  it("renders correctly without data", () => {
    const tree = renderer
      .create(<CommentList data={[]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with data", () => {
    const tree = renderer
      .create(<CommentList data={mockData} />)
      .toJSON(); expect(tree).toMatchSnapshot();
  });
});
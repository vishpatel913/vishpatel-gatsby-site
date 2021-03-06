import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

import {
  Layout,
  Container,
  MarkdownRenderer,
  Link,
  // CommentForm,
  // CommentList,
  SiteHead,
  Icon
} from "../components";
import { capitalizeString, getAltText, getImageWithTracedSVG } from "../utils";
import { useDarkMode } from "../context/darkMode";

const HeaderContainer = styled.div`
  @media (min-width: ${({ theme }) => theme.bp.md}) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto;
  }
`;

const ContentContainer = styled(Container)`
  @media (min-width: ${({ theme }) => theme.bp.md}) {
    margin: 0;
  }
`;

const PostImage = styled(GatsbyImage)`
  width: 100%;
  margin: 0;
`;

const ImageMetaContainer = styled.div`
  color: ${({ theme }) => theme.color.greyDark};

  &:before {
    content: "";
    display: block;
    width: 48px;
    height: 2px;
    background: ${({ theme }) => theme.color.grey};
    margin-bottom: 1rem;
  }
`;

const DateText = styled.span`
  display: block;
  margin-bottom: 4px;
`;

const CategoryLink = styled(Link)`
  display: inline-block;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.color.greyDark};
`;

const TagLink = styled.span`
  display: inline-block;
  text-decoration: none;
  color: ${({ theme }) => theme.color.greyDark};
  margin-right: 0.5rem;

  &:hover {
    color: ${({ theme }) => theme.color.primary};
  }
`;

const Tag = ({ title }) => {
  const tagSlug = title.toLowerCase().split(" ").join("-");
  return <TagLink to={`tag/${tagSlug}`}>{`#${title}`}</TagLink>;
};

const ImageTemplate = ({ data, location }) => {
  const { isDarkMode } = useDarkMode();
  const {
    title,
    photo,
    imageCaption,
    dateCreated,
    category,
    tags
    // slug
  } = data.contentfulImage;
  // const comments =
  //   data.allContentfulPostComment && data.allContentfulPostComment.edges;
  const metaDescription = imageCaption
    ? imageCaption.imageCaption
    : getAltText(title, category);

  return (
    <Layout white page={location.pathname}>
      <SiteHead title={title} description={metaDescription} keywords={tags} />
      <HeaderContainer>
        <PostImage
          image={getImageWithTracedSVG(photo, isDarkMode)}
          title={title}
          alt={getAltText(title, category)}
        />
        <ContentContainer content>
          <h1>{title}</h1>
          {imageCaption && (
            <MarkdownRenderer
              source={imageCaption.childMarkdownRemark.rawMarkdownBody}
            />
          )}
          <ImageMetaContainer>
            <DateText>{dateCreated}</DateText>
            <CategoryLink href={`/work/${category}`} title={category}>
              <Icon name="category" />
              {capitalizeString(category)}
            </CategoryLink>
          </ImageMetaContainer>
          {tags.sort().map(tag => (
            <Tag key={tag} title={tag} />
          ))}
        </ContentContainer>
      </HeaderContainer>
      {/* <Container content>
        {comments && <CommentList data={comments} />}
        <CommentForm slug={slug} />
      </Container> */}
    </Layout>
  );
};

export default ImageTemplate;

export const query = graphql`
  query($slug: String!) {
    contentfulImage(slug: { eq: $slug }) {
      title
      slug
      photo {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: TRACED_SVG)
      }
      imageCaption {
        imageCaption
        childMarkdownRemark {
          rawMarkdownBody
        }
      }
      dateCreated(formatString: "Do MMMM YYYY")
      category
      tags
    }
    # allContentfulPostComment(
    #   sort: { fields: [timestamp], order: DESC }
    #   filter: { postSlug: { eq: $slug } }
    # ) {
    #   edges {
    #     node {
    #       name
    #       message {
    #         message
    #       }
    #       timestamp
    #     }
    #   }
    # }
  }
`;

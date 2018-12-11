import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import SiteHead from '../components/siteHead'
import Icon from '../components/icon'
import colors from '../utils/colors'
import { capitalizeString, getAltText, editTracedSvg } from '../utils/helpers'

const PostContainer = styled.div`
  background: white;
  margin: 0.5rem;

  @media (max-width: 768px) {
    margin: 0;
    padding: 0;
  }
`

const FlexContainer = styled.div`
  @media (min-width: 992px) {
    display: flex;
  }
`

const ImageContainer = styled.div`
  @media (min-width: 992px) {
    flex: 2;
  }
`

const ContentContainer = styled.div`
  @media (min-width: 992px) {
    flex: 1;
    padding: 1.5rem;
  }
  @media (max-width: 992px) {
    padding: 2rem;
    max-width: 80%;
    margin: auto;
  }
  @media (max-width: 768px) {
    max-width: 100%;
  }
`

const PostImage = styled(Img)`
  width: 100%;
  margin: 0;
`

const ImageTitle = styled.h1``

const ImageCaption = styled.p``

const ImageMetaContainer = styled.div`
  color: grey;

  &:before {
    content: '';
    display: block;
    width: 48px;
    height: 2px;
    background: #ddd;
    margin-bottom: 1rem;
  }
`

const DateText = styled.span`
  display: block;
  margin-bottom: 4px;
`

const CategoryLink = styled(Link)`
  display: inline-block;
  margin-bottom: 4px;
  text-decoration: none;
  color: grey;

  &:hover {
    color: ${colors.primary};
  }
`

const TagLink = styled.span`
  display: inline-block;
  text-decoration: none;
  color: grey;
  margin-right: 0.5rem;

  &:hover {
    color: ${colors.primary};
  }
`

const Tag = ({ title }) => {
  let tagSlug = title
    .toLowerCase()
    .split(' ')
    .join('-')
  return <TagLink to={'tag/' + tagSlug}>#{title}</TagLink>
}

const ImageTemplate = ({ data, location }) => {
  const {
    title,
    photo,
    imageCaption,
    dateCreated,
    category,
    slug,
    tags,
  } = data.contentfulImage

  const metaDescription = imageCaption
    ? imageCaption.imageCaption
    : getAltText(title, category)

  return (
    <Layout page={location.pathname}>
      <SiteHead title={title} description={metaDescription} keywords={tags} />
      <PostContainer>
        <FlexContainer>
          <ImageContainer>
            <PostImage
              fluid={editTracedSvg(photo.fluid)}
              title={title}
              alt={getAltText(title, category)}
            />
          </ImageContainer>
          <ContentContainer>
            <h1>{title}</h1>
            {imageCaption && (
              <div
                dangerouslySetInnerHTML={{
                  __html: imageCaption.childMarkdownRemark.html,
                }}
              />
            )}
            <ImageMetaContainer>
              <DateText>{dateCreated}</DateText>
              <CategoryLink to={'/work/' + category}>
                <Icon name="category" />
                {capitalizeString(category)}
              </CategoryLink>
            </ImageMetaContainer>
            {tags.sort().map(tag => (
              <Tag key={tag} title={tag} />
            ))}
          </ContentContainer>
        </FlexContainer>
      </PostContainer>
    </Layout>
  )
}

export default ImageTemplate

export const query = graphql`
  query($slug: String!) {
    contentfulImage(slug: { eq: $slug }) {
      title
      slug
      photo {
        fluid(maxWidth: 900) {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      imageCaption {
        imageCaption
        childMarkdownRemark {
          html
        }
      }
      dateCreated(formatString: "Do MMMM YYYY")
      category
      tags
    }
  }
`

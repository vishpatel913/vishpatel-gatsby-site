import React from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import colors from '../utils/colors'
import logo from '../../static/logo/logo-light.png'

const Container = styled.div`
  background: #333333;
`

const Main = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1200px;
  padding: 1.5rem 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const Menu = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`

const InternalLink = styled(Link)`
  color: ${colors.grey};
  text-decoration: none;
  margin: 0.5rem;

  &:hover {
    color: ${colors.primaryLight};
  }
`

const ExternalLink = styled.a`
  color: ${colors.grey};
  text-decoration: none;
  margin: 0.5rem;

  &:hover {
    color: ${colors.primaryLight};
  }
`

const Logo = styled.img`
  margin: 0 0.5rem;
  height: 64px;
  width: 64px;
  @media (max-width: 768px) {
    height: 44px;
    width: 44px;
  }
`

const Tab = ({ title, ext }) => {
  let label = title
    .toUpperCase()
    .split('-')
    .join(' ')
  if (ext) {
    return (
      <ExternalLink href={ext} target="_blank">
        {label}
      </ExternalLink>
    )
  } else {
    const link = '/' + title
    return (
      <InternalLink
        activeStyle={{
          color: `${colors.primaryLight}`,
        }}
        to={link}
      >
        {label}
      </InternalLink>
    )
  }
}

const Header = () => (
  <Container>
    <Main>
      <Link to="/">
        <Logo src={logo} />
      </Link>
      <Menu>
        <Tab title="about" />
        <Tab title="work" />
        <Tab title="resume" ext="http://www.vishpatel.com/cv-2018" />
      </Menu>
    </Main>
  </Container>
)

export default Header

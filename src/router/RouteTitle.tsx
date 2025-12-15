import React from 'react'

interface Props {
  title?: string
  children: React.ReactNode
}

const Auth: React.FC<Props> = (props) => {
  document.title = props.title ?? 'app'
  return props.children
}

export default Auth

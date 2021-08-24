import React from 'react'

type Props = {
  link: {
    description: string,
    url: string
  }
}

const Link = (props: Props) => {
  const { link } = props

  return (
    <div>
      <div>
        {link.description} ({link.url})
      </div>
    </div>
  )
}

export default Link

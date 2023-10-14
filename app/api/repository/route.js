import { useState, useEffect } from 'react'
 
function Profile() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const username = '';
 
  useEffect(() => {
    fetch('/api/repos?username=${username}')
      .then((res) => res.json())
      .then((data) => {
        setData(data.repos)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <ul>
      {data.map((repo) => (
        <li key={repo.name}>
          <a href={repo.url}>{repo.name}</a>
        </li>
      ))}
    </ul>
    </div>
  )
}
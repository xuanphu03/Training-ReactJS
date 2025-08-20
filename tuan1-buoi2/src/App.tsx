import React from 'react'
import Card from './components/card'
import './App.css'

export interface UserProps { 
  id: number;
  name: string;
  email: string;
  avatar: string;
}

function App() {

  const [user, setUser] = React.useState < UserProps | null > (null)
  
  React.useEffect(() => {
    setTimeout(() => {
      setUser({
        id: 1,
        name: 'Xuan Phu',
        email: 'xuan.phu@gmail.com',
        avatar: 'vite.svg'
      })
    }, 2000)
  }, [])

  return (
    <>
      <h1>XinK Training</h1>
      <Card user={user} />
    </>
  )
}

export default App

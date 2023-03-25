import { useEffect, useReducer, useState } from 'react'
import './App.css'

const getRandomNumber = async():Promise<number> =>{
  const res = await fetch('https://www.random.org/integers/?num=1&min=1&max=500&col=1&base=10&format=plain&rnd=new')
  const numberString = await res.text()
  return +numberString
}

export const App =  () => {
  
  const [number, setNumber] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [key, forceRefetch] = useReducer((x)=>x+1,0)

  useEffect(()=>{
    setIsLoading(true)
    getRandomNumber().then(setNumber)
  },[key])

  useEffect(()=>{
    if(number) setIsLoading(false)
  },[number])

  return (
    <div className="App App-header">
      {
        isLoading ? 
        <h2>Cargando ...</h2>
        :<h2>Numero aleatorio: {number}</h2>
      }
      <button onClick={forceRefetch} disabled={isLoading}>
        Nuevo numero
      </button>
    </div>
  )
}


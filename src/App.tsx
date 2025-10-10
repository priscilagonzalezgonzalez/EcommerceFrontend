import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { z } from 'zod'
import { orderSchema } from './schemas/order.schema'

function App() {
  const [count, setCount] = useState(0)
  const order = {
    status: 'pending',
    total: -10,
    costumerName: 'Priscila',
    country: 'MXN',
    street: 'Avenida de las Americas',
    city: 'Guadalajara',
    zipCode: '44700',
    phone: '3320443901',
  }

  try {
    const zodObject = orderSchema.parse(order);
    console.log(zodObject);
  } catch (error) {
    console.error(error as Error);
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

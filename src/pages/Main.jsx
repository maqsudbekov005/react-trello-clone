import { useTasksContext } from '../providers/contextProvider'
import React, { useState } from 'react'
import Card from '../components/card'
import shortid from 'shortid'

const Main = () => {
  const [cardTitle, setCardTitle] = useState('')
  const { cards, setCards } = useTasksContext()
  const [show, setShow] = useState(false)

  const onChange = (e) => {
    setCardTitle(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const data = { id: shortid.generate(), name: cardTitle }
    setCards([...cards, data])
    setCardTitle('')
    setShow(false)
  }

  const onShow = () => {
    setShow(true)
  }

  const onCancel = () => {
    setCardTitle('')
    setShow(false)
  }

  return (
    <div className='grid grid-cols-4 items-start gap-3 px-2'>
      {cards.map((card) => (
        <Card title={card.name} id={card.id} key={card.id} />
      ))}
      <div className=''>
        <button
          type='submit'
          className={`bg-blue-600 py-2 px-8 rounded-md text-neutral-100 ${show ? 'hidden' : 'block'}`}
          onClick={onShow}
        >
          + Add Card
        </button>
        <form className={`px-1 w-80 ${show ? 'block' : 'hidden'}`} onSubmit={onSubmit}>
          <textarea required onChange={onChange} value={cardTitle} className='border-none w-full outline-none h-24 p-1 rounded-md text-gray-900 resize-none' name="" id="" />
          <div className="flex items-center gap-x-2">
            <button type='submit' className='bg-blue-600 py-2 px-4 rounded-md text-neutral-100'>+ Add Card</button>
            <button type='button' className='bg-gray-200 text-gray-900 py-2 px-4 rounded-md' onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Main

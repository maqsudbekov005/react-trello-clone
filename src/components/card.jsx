import { useTasksContext } from '../providers/contextProvider'
import React, { useState } from 'react'
import { generate } from 'shortid'

function Card({ id, title }) {
    const { cards, setCards } = useTasksContext()
    const [state, setState] = useState({
        show: false,
        task: '',
        tasks: []
    })

    const showHandler = () => {
        setState({ ...state, show: true })
    }

    const hideHandler = () => {
        setState(prevState => ({
            ...prevState,
            show: false,
            task: '',
        }))
    }

    const onChange = (e) => {
        setState({ ...state, task: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const id = generate()
        setState(prevState => ({
            ...prevState,
            tasks: [...prevState.tasks, { id: id, name: state.task }],
            show: false,
            task: ''
        }))
    }

    const onDelete = (id) => {
        const filteredTasks = state.tasks.filter(el => el.id !== id)
        setState({ ...state, tasks: filteredTasks })
    }

    const cardDelete = (id) => {
        const filteredCards = cards.filter(el => el.id !== id)
        setCards(filteredCards)
    }

    return (
        <div className='rounded border border-neutral-700 bg-neutral-800 p-3 text-neutral-100 active:cursor-grabbing'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-x-2'>
                    <p className='text-sm text-neutral-100'>{title}</p>
                    <p>{state.tasks.length}</p>
                </div>
                <div className='cursor-pointer p-0.5 rounded-full text-gray-900 w-6 h-6 bg-gray-200' onClick={() => cardDelete(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
            {state.tasks.map((task) => (
                <div key={task.id} className='px-2 h-12 bg-slate-200 flex justify-between items-center rounded-md my-3 text-gray-900'>
                    <p>{task.name}</p>
                    <div className='flex items-center gap-x-3'>
                        <div className='cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </div>
                        <div className='cursor-pointer text-red-500' onClick={() => onDelete(task.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </div>
                    </div>
                </div>
            ))}
            <div className=''>
                <p className='text-gray-50 my-2 cursor-pointer' onClick={showHandler}>+ add task</p>
                <form className={state.show ? 'block' : 'hidden'} onSubmit={onSubmit}>
                    <textarea required value={state.task} onChange={onChange} className='border-none outline-none p-1 w-full rounded-md text-gray-900 resize-none' name="" id="" />
                    <div className="flex items-center justify-end gap-x-2">
                        <button type='submit' className='bg-blue-600 py-1.5 px-4 rounded-md'>Submit</button>
                        <button className='bg-gray-200 text-gray-900 py-1.5 px-4 rounded-md' onClick={hideHandler}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Card

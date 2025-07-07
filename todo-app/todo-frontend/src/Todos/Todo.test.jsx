import React from 'react'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders todo text correctly', () => {
  const todo = {
    text: 'This is a test todo item',
    done: false
  }

  const deleteTodo = vi.fn()
  const completeTodo = vi.fn()

  render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)

  const element = screen.getByText('This is a test todo item')
  expect(element).toBeDefined()
})

test('displays "not done" status for an incomplete todo', () => {
  const todo = {
    text: 'An incomplete task',
    done: false
  }

  const deleteTodo = vi.fn()
  const completeTodo = vi.fn()

  render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)

  const notDoneElement = screen.getByText('This todo is not done')
  expect(notDoneElement).toBeDefined()
})

test('displays "done" status for a completed todo', () => {
  const todo = {
    text: 'A completed task',
    done: true
  }

  const deleteTodo = vi.fn()
  const completeTodo = vi.fn()

  render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)

  const doneElement = screen.getByText('This todo is done')
  expect(doneElement).toBeDefined()
})

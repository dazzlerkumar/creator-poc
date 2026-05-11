import { setupServer } from 'msw/node'

export const handlers = [
  // Default handlers can go here
]

export const server = setupServer(...handlers)


import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
    it('renders a heading', () => {
        render(<Home />)

        const heading = screen.getByRole('heading', {
            name: /Welcome to Gister/i,
        })

        expect(heading).toBeInTheDocument()
    })

    it('renders sub-heading', () => {
        render(<Home />)

        const heading = screen.getByRole('heading', {
            name: /Get started by adding a Github username./i,
        })

        expect(heading).toBeInTheDocument()
    })
})
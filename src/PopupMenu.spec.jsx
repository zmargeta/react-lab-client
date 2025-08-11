import PopupMenu, { PopupMenuItem } from './PopupMenu.jsx'
import React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import '@testing-library/jest-dom/vitest'

describe('PopupMenu', () => {
  it('renders a menu when visible', () => {
    // arrange
    render(
      <PopupMenu visible={true}>
        <PopupMenuItem>menu_item_1</PopupMenuItem>
        <PopupMenuItem>menu_item_2</PopupMenuItem>
      </PopupMenu>
    )

    // assert
    expect(screen.queryByRole('menu')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(1)
    expect(screen.getAllByRole('menuitem')).toHaveLength(2)
  })

  it('does not render a menu when not visible', () => {
    // arrange
    render(
      <PopupMenu visible={false}>
        <PopupMenuItem>menu_item_1</PopupMenuItem>
        <PopupMenuItem>menu_item_2</PopupMenuItem>
      </PopupMenu>
    )

    // assert
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('triggers the callback on clicking the hide button', async () => {
    // arrange
    const user = userEvent.setup()
    const callback = vi.fn()
    render(
      <PopupMenu visible={true} onHide={callback}>
        <PopupMenuItem>menu_item_1</PopupMenuItem>
        <PopupMenuItem>menu_item_2</PopupMenuItem>
      </PopupMenu>
    )

    // act
    await user.click(screen.getByRole('button'))

    // assert
    expect(callback).toHaveBeenCalled()
  })

  it('triggers the callback on mouse leave', async () => {
    // arrange
    const user = userEvent.setup()
    const callback = vi.fn()
    render(
      <PopupMenu visible={true} onHide={callback}>
        <PopupMenuItem>menu_item_1</PopupMenuItem>
        <PopupMenuItem>menu_item_2</PopupMenuItem>
      </PopupMenu>
    )

    // act
    await user.hover(screen.getByRole('menu'))
    await user.unhover(screen.getByRole('menu'))

    // assert
    expect(callback).toHaveBeenCalled()
  })

  it('triggers the callback on clicking a menu item', async () => {
    // arrange
    const user = userEvent.setup()
    const callback = vi.fn()
    render(
      <PopupMenu visible={true}>
        <PopupMenuItem onClick={callback}>menu_item_1</PopupMenuItem>
        <PopupMenuItem>menu_item_2</PopupMenuItem>
      </PopupMenu>
    )

    // act
    await user.click(screen.getByRole('menuitem', { name: 'menu_item_1' }))

    // assert
    expect(callback).toHaveBeenCalled()
  })

  afterEach(() => {
    cleanup()
  })
})

import type { Preview } from '@storybook/react'
import { useEffect } from 'react'
import '../src/index.css'

const preview: Preview = {
  parameters: {
    controls: { expanded: true },
    backgrounds: { disable: true },
    layout: 'centered',
  },
  globalTypes: {
    theme: {
      description: 'Color theme',
      defaultValue: 'dark',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme as 'light' | 'dark'
      useEffect(() => {
        document.body.classList.toggle('dark', theme === 'dark')
      }, [theme])
      return (
        <div className="bg-canvas text-fg p-6 rounded-lg min-w-[280px]">
          <Story />
        </div>
      )
    },
  ],
}

export default preview

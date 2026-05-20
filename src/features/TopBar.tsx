import { ShieldCheck, Bell, Search, Sun, Moon, Settings } from 'lucide-react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Badge } from '../components/Badge'
import { Avatar } from '../components/Avatar'

interface TopBarProps {
  theme: 'light' | 'dark'
  onToggleTheme: () => void
}

export function TopBar({ theme, onToggleTheme }: TopBarProps) {
  return (
    <header className="flex items-center gap-4 px-4 h-14 border-b border-line bg-surface shrink-0">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-md bg-brand text-brand-fg flex items-center justify-center shadow-sm">
          <ShieldCheck className="size-4" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-semibold tracking-tight">Bulwark</span>
          <span className="text-[10px] text-fg-subtle uppercase tracking-wider">
            Incident command
          </span>
        </div>
      </div>

      <Badge variant="outline" size="sm" className="ml-1">
        production
      </Badge>

      <div className="flex-1 max-w-md">
        <Input
          size="sm"
          placeholder="Search incidents, services, runbooks…"
          leftIcon={<Search className="size-3.5" />}
        />
      </div>

      <div className="flex items-center gap-1 ml-auto">
        <Button variant="ghost" size="icon-sm" aria-label="Notifications">
          <Bell className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Toggle theme"
          onClick={onToggleTheme}
        >
          {theme === 'dark' ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
        </Button>
        <Button variant="ghost" size="icon-sm" aria-label="Settings">
          <Settings className="size-4" />
        </Button>
        <div className="w-px h-6 bg-line mx-1" />
        <Avatar name="You Here" size="sm" status="online" />
      </div>
    </header>
  )
}

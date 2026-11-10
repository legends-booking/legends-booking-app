import { Home, CalendarPlus, Bell, User, } from 'lucide-react'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import type { User as LoggedInUser } from '../types'

const TABS = [
    {label: "Home", icon: Home, nav: "/"},
    {label: "Book", icon: CalendarPlus, nav: "/schedule"},
    {label: "Alerts", icon: Bell, nav: "/notifications", badge: true},
    {label: "Account", icon: User, nav: "/account"},
]


function useKeyboardOpen() {
    const [open, setOpen] = useState(false);
    useEffect(() => {
      const isField = (el) => el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
      const onIn = (e) => isField(e.target) && setOpen(true);
      const onOut = () => setOpen(false);
      document.addEventListener("focusin", onIn);
      document.addEventListener("focusout", onOut);
      return () => {
        document.removeEventListener("focusin", onIn);
        document.removeEventListener("focusout", onOut);
      };
    }, []);
    return open;
}

export function Dock({unreadCount =0, user}: {unreadCount: number, user: LoggedInUser|null}) {
    const keyboardOpen = useKeyboardOpen();
    if (keyboardOpen) return null;
    const badgeText = unreadCount > 9 ? "9+" : String(unreadCount);
    return  user ?(
        <nav className="dock" aria-label="Main">
        {TABS.map(({ nav, label, icon: Icon , badge}) => (
            <NavLink
            key={nav}
            to={nav}
            className={({ isActive }) => "dock__tab" + (isActive ? " is-active" : "")}
            >
            <span className="dock__icon">
                <Icon aria-hidden="true" />
                {badge && unreadCount > 0 && (
                <span className="dock__badge" aria-label={`${unreadCount} unread`}>
                    {badgeText}
                </span>
                )}
            </span>
            <span className="dock__label">{label}</span>
            </NavLink>
        ))}
        </nav>
    ): null;


}
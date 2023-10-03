import MonitorIcon from '@mui/icons-material/Monitor';
import TaskIcon from '@mui/icons-material/Task';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export const NavItemsPrivate = [
    {
        id: 0,
        icon: MonitorIcon,
        label: 'Главная',
        route: '/monitor',
    },
    {
        id: 1,
        icon: TaskIcon,
        label: 'Задачи',
        route: '/tasks',
    },
    {
        id: 2,
        icon: AdminPanelSettingsIcon,
        label: 'Администрирование',
        route: '/admin',
    },
]
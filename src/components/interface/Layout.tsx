import {useState, useEffect} from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { checkFio, checkRole, logout } from '../../rtk/features/authSlice';
import LogoutIcon from '@mui/icons-material/Logout'
import MonitorPage from '../../pages/MonitorPage';
import LoginPage from '../../pages/LoginPage';
import TasksPage from '../../pages/TasksPage';
import AdminPage from '../../pages/AdminPage';
import PrivateRotes from './routes/PrivateRotes';
import PublicRotes from './routes/PublicRotes';
import UserTable from '../tables/UserTable';
import DepartmentTable from '../tables/DepartmentTable';
import { useAppDispatch, useAppSelector } from '../../rtk/store';
import { useLogoutUserMutation } from '../../rtk/api/authAPI';
import { NavItemsPrivate } from './nav-items/NavItemsPrivate';
import { NavItemsPublic } from './nav-items/NavItemsPublic';
import ProjectTable from '../tables/ProjectTable';
import SpecTable from '../tables/SpecTable';
import DseCard from '../tables/DseCard';
import ProjectSelect from '../menu/ProjectSelect';
import AgregatSelect from '../menu/AgregatSelect';
import DseSelect from '../menu/DseSelect';


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Layout() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawer = (open:any) => {
    setOpen(open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const role = useAppSelector(checkRole)
  const fio = useAppSelector(checkFio)
  const navigate = useNavigate()
  
  const [logoutUser, { isSuccess }] = useLogoutUserMutation()
  const dispatch = useAppDispatch()
  let NavItems = [...NavItemsPublic];
  (role === 'Developer' || role === 'Admin') ? NavItems = [...NavItemsPrivate] : NavItems = [...NavItemsPublic]
  const logoutHandler = async () => {
    dispatch(logout())
      await logoutUser("")
  }

  useEffect(() => {
      if (isSuccess) {   
          navigate("/login")
      }
  }, [navigate, dispatch, isSuccess])

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => handleDrawer(!open)}
            edge="start"

          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            ИСОК
          </Typography>
          <Typography variant="h6" noWrap component="div"
          sx={{ marginLeft: 'auto',
                marginRight: 0}}> 
            {fio}
          </Typography>
          
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {NavItems.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ display: 'block' }} onClick={() => navigate(item.route)}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {<item.icon />}
                </ListItemIcon>
                <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={logoutHandler}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {<LogoutIcon/>}
                </ListItemIcon>
                <ListItemText primary={"Выйти"} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
        
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <Routes>
        <Route element={<PrivateRotes />}>
          <Route path='/monitor' element={<MonitorPage />} />
          <Route path='/tasks' element={<TasksPage />} />
          <Route path='/tasks/project' element={<ProjectSelect />} />
          <Route path='/tasks/project/:id' element={<ProjectTable />} />
          <Route path='/tasks/agregat/' element={<AgregatSelect/>} />
          <Route path='/tasks/agregat/:id' element={<SpecTable/>} />
          <Route path='/tasks/agregat/dse/' element={<DseSelect/>} />
          <Route path='/tasks/agregat/dse/:id' element={<DseCard/>} />
          {(role === 'Developer' || role === 'Admin') ? <Route path='/admin' element={<AdminPage />} /> : <></>}
          {(role === 'Developer' || role === 'Admin') ? <Route path='/admin/user' element={<UserTable />} /> : <></>}
          {(role === 'Developer' || role === 'Admin') ? <Route path='/admin/department' element={<DepartmentTable />} /> : <></>}
          <Route path='*' element={<Navigate to={'/monitor'} />} />
        </Route>
        <Route element={<PublicRotes />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='*' element={<Navigate to={'/login'} />} />
        </Route>
      </Routes>
      </Box>
    </Box>
  );
}
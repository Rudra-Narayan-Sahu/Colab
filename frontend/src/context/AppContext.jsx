import React, { createContext, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

const API_BASE = "https://api.plus.in/api/v1"; // PRODUCTION URL

/**
 * Standard fetch wrapper to always include cookies and CSRF headers.
 */
export async function fetchSecure(endpoint, options = {}) {
  options.credentials = "include";
  options.headers = {
    ...options.headers,
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json"
  };
  return fetch(`${API_BASE}${endpoint}`, options);
}

// Sandbox user profile matching Alex Rivera for mock/demo purposes
export const sandboxUser = {
  name: 'Alex Rivera',
  title: 'CS Student & Builder',
  role: 'Frontend & Systems',
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
  reliability: 98,
  bio: 'CS sophomore at Stanford. Love building responsive user interfaces and hackathon projects. Always down to write clean React or design fresh web mockups.',
  skills: ['React', 'Tailwind CSS', 'TypeScript', 'Node.js', 'PostgreSQL', 'Figma', 'Git'],
  profileViews: 1284,
  profileViewsGrowth: '+12% this week',
  projectReach: '8.4k views',
  projectReachGrowth: '+5%',
  reliabilityDesc: 'Highly Collaborative',
  teams: [
    { id: 'dsl', name: 'Distributed Systems Lab', initial: 'DS', role: 'Lead Developer', members: 12 },
    { id: 'sh', name: 'Stanford Hackers', initial: 'SH', role: 'Frontend Contributor', members: 8 }
  ],
  completedProjects: [
    {
      id: 'qm',
      title: 'Quantum Metrics UI',
      desc: 'A friendly data dashboard to track blockchain transaction times visually.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400',
      contributors: 4
    },
    {
      id: 'es',
      title: 'EduSync Mobile',
      desc: 'Study app that auto-generates custom flashcards to help study for tests.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400',
      contributors: 2
    }
  ],
  reviews: [
    {
      id: 'r1',
      author: 'Sarah K.',
      rating: 5,
      text: '"Alex has a great attitude and is very responsive. He stayed up late with us to help deploy our dashboard before the deadline!"'
    },
    {
      id: 'r2',
      author: 'James W.',
      rating: 5,
      text: '"Awesome collaborator! Writes super clean CSS and communicated really clearly throughout the weekend build."'
    }
  ]
};

export const AppProvider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Derive currentRoute from URL pathname
  const currentRoute = location.pathname === '/' ? 'landing' : location.pathname.substring(1);

  const setCurrentRoute = (route) => {
    if (route === 'landing') {
      navigate('/');
    } else {
      navigate('/' + route);
    }
  };

  // Modals
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  // Authentication State
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Global Search State
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Hackathons Data
  const [hackathons, setHackathons] = useState([
    { 
      id: 'h1', 
      title: 'Global AI Summit', 
      date: 'Oct 12-14', 
      prize: '$25k Prizes', 
      status: 'Active Now', 
      endsIn: '2 days', 
      iconBg: 'bg-blue-50 text-blue-600',
      prizeAmount: '25,000',
      prizeLabel: 'prize pool',
      description: 'Craft next-generation agent systems, neural interfaces, and autonomous tools alongside leading researchers.',
      category: 'AI & Agents',
      colors: {
        primary: '#4d61ff',
        primaryHover: '#5e70ff',
        secondary: '#ff3e00',
        secondaryHover: '#ff6d43',
        accent: '#00e0b0'
      }
    },
    { 
      id: 'h2', 
      title: 'EcoBuild 2024', 
      date: 'Oct 20-22', 
      prize: '$15k Prizes', 
      status: 'Join the Hunt', 
      endsIn: '5 days', 
      iconBg: 'bg-emerald-50 text-emerald-600',
      prizeAmount: '15,000',
      prizeLabel: 'prize pool',
      description: 'Design solutions for local resource distribution, biodiversity tracking, and smart grid automation.',
      category: 'Climate Tech',
      colors: {
        primary: '#10b981',
        primaryHover: '#34d399',
        secondary: '#4d61ff',
        secondaryHover: '#5e70ff',
        accent: '#f59e0b'
      }
    },
    { 
      id: 'h3', 
      title: 'FinTech Frontier', 
      date: 'Oct 18-21', 
      prize: '$10k Prizes', 
      status: 'Ends in 2d', 
      endsIn: '2 days', 
      iconBg: 'bg-slate-900 text-white',
      prizeAmount: '10,000',
      prizeLabel: 'prize pool',
      description: 'Develop decentralized ledger apps, novel credit micro-portals, or secure transaction wrappers.',
      category: 'DeFi & Ledger',
      colors: {
        primary: '#8b5cf6',
        primaryHover: '#a78bfa',
        secondary: '#06b6d4',
        secondaryHover: '#22d3ee',
        accent: '#ff007f'
      }
    },
    { 
      id: 'h4', 
      title: 'Sustainability Jam', 
      date: 'Nov 02-04', 
      prize: '$5k Prizes', 
      status: 'Upcoming', 
      endsIn: '10 days', 
      iconBg: 'bg-green-50 text-green-600',
      prizeAmount: '5,000',
      prizeLabel: 'prize pool',
      description: 'Collaborate on community recycling indexes, green transit planners, and carbon credit meters.',
      category: 'Eco Computing',
      colors: {
        primary: '#059669',
        primaryHover: '#10b981',
        secondary: '#ea580c',
        secondaryHover: '#f97316',
        accent: '#06b6d4'
      }
    }
  ]);

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      type: 'request',
      user: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
      actionText: 'wants to team up for',
      target: 'AI Planner',
      time: '2h ago',
      status: 'pending' 
    },
    {
      id: 'n2',
      type: 'system',
      title: 'New Feature Announcement',
      actionText: 'We just added simple team chat settings in your project dashboards.',
      time: '5h ago',
      read: false
    },
    {
      id: 'n3',
      type: 'match',
      title: 'Team Matches Available',
      actionText: '4 new teams are looking for your React & Tailwind design skills.',
      time: 'Yesterday',
      read: true
    }
  ]);

  // Active Applications Tracker
  const [applications, setApplications] = useState([
    {
      id: 'a1',
      project: 'AI Productivity Suite',
      role: 'Frontend UI Designer',
      status: 'Reviewing', 
      timeline: 'Reviewing application details',
      progress: 45,
    },
    {
      id: 'a2',
      project: 'Skyline CMS',
      role: 'React Developer',
      status: 'Accepted',
      timeline: 'Welcome aboard! Workspace joined.',
      progress: 100,
    }
  ]);

  // Weekly Curated Opportunities
  const [opportunities, setOpportunities] = useState([
    {
      id: 'o1',
      title: 'Web3 Health App',
      type: 'HACKATHON',
      sub: 'Startup Challenge • 12d left',
      desc: 'We are crafting an app to track workouts. Need a friendly React developer to help design widgets and screens.',
      avatars: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
      ],
      extraMembers: 2
    },
    {
      id: 'o2',
      title: 'Sustainability Dashboard',
      type: 'PROJECT',
      sub: 'Open Source collab',
      desc: 'Visualizing localized solar usage. Looking for help with Recharts elements and data flow layout.',
      avatars: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100'
      ],
      extraMembers: 3
    }
  ]);

  // Active Teams in Team Finder
  const [activeTeams, setActiveTeams] = useState([
    {
      id: 't1',
      name: 'Neural Knights',
      hackathon: 'Global AI Hackathon',
      posted: '2h ago',
      desc: 'We are creating a simple budget tracker that scans receipts automatically. We have the data model done, just need a frontend developer who loves tidy typography and clean Tailwind dashboards.',
      avatars: [
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'
      ],
      extraMembers: 2,
      rolesNeeded: ['Frontend Developer'],
      tags: ['Frontend Dev', 'React', 'Tailwind CSS'],
      requested: false,
    },
    {
      id: 't2',
      name: 'ChainReactors',
      hackathon: 'FinTech Frontier',
      posted: '5h ago',
      desc: 'Developing a micro-lending page for student entrepreneurs. Our smart contracts are ready—looking for a UI designer to help make our layout feel clean and easy to navigate.',
      avatars: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100'
      ],
      extraMembers: 1,
      rolesNeeded: ['UX Designer'],
      tags: ['UX Designer', 'Figma', 'UI Layout'],
      requested: false,
    },
    {
      id: 't3',
      name: 'EcoMetrics',
      hackathon: 'Sustainability Jam',
      posted: '1d ago',
      desc: 'A web app designed to estimate carbon footprints. We are a team of 3 CS majors looking for a friendly Python builder to help parse data queries.',
      avatars: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100'
      ],
      extraMembers: 0,
      rolesNeeded: ['Backend Developer'],
      tags: ['Backend Dev', 'Python', 'FastAPI'],
      requested: false,
    }
  ]);

  // Admin Mock Database
  const [platformUsers, setPlatformUsers] = useState([
    { name: 'Alex Rivera', email: 'alex@stanford.edu', status: 'Verified', reliability: 98 },
    { name: 'Sarah Chen', email: 'sarah@berkeley.edu', status: 'Verified', reliability: 96 },
    { name: 'James Wu', email: 'james@mit.edu', status: 'Pending Review', reliability: 88 },
    { name: 'Ryan K.', email: 'ryan@harvard.edu', status: 'Verified', reliability: 92 }
  ]);

  // Core Session Verification (init)
  const init = async () => {
    console.log("Init: Verifying secure session...");
    setAuthLoading(true);

    // Sandbox Session Check
    if (localStorage.getItem('colabhub_sandbox_session') === 'true') {
      console.log("Init: Sandbox session active.");
      setCurrentUser(sandboxUser);
      setAuthLoading(false);
      return sandboxUser;
    }

    try {
      // 1. Try to access a protected endpoint
      let response = await fetchSecure("/auth/me");

      // 2. If unauthorized (access token expired or missing), attempt a refresh
      if (response.status === 401) {
        console.log("Init: Access token expired. Attempting secure refresh...");
        const refreshResponse = await fetchSecure("/auth/refresh", { method: "POST" });
        
        if (refreshResponse.ok) {
          console.log("Init: Refresh successful! New tokens acquired.");
          // Retry original request
          response = await fetchSecure("/auth/me");
        } else {
          console.log("Init: Refresh failed (token revoked/expired). Redirecting to login.");
          setCurrentUser(null);
          setAuthLoading(false);
          setCurrentRoute('login');
          return null;
        }
      }

      // 3. If any other failure occurs (e.g. 403 Forbidden), redirect to login
      if (!response.ok) {
        console.log("Init: Authentication failed. Redirecting to login.");
        setCurrentUser(null);
        setAuthLoading(false);
        setCurrentRoute('login');
        return null;
      }

      // 4. Success! Return the data so the page can render
      console.log("Init: Authentication completely successful!");
      const userData = await response.json();
      // Mix backend data with standard fields
      const mergedUser = {
        ...sandboxUser,
        ...userData,
        name: userData.name || userData.username || sandboxUser.name
      };
      setCurrentUser(mergedUser);
      setAuthLoading(false);
      return mergedUser;
    } catch (err) {
      console.warn("Init: API Connection issue. Redirecting to login. Note: Backend API must support CORS for localhost.", err);
      setCurrentUser(null);
      setAuthLoading(false);
      // If we got a network error, do not force-redirect immediately on public routes
      if (location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup') {
        setCurrentRoute('login');
      }
      return null;
    }
  };

  // Secure Login Trigger
  const login = async (email, password, isSandbox = false) => {
    setAuthLoading(true);
    if (isSandbox) {
      // Simulate network lag
      await new Promise(resolve => setTimeout(resolve, 800));
      localStorage.setItem('colabhub_sandbox_session', 'true');
      setCurrentUser(sandboxUser);
      setAuthLoading(false);
      setCurrentRoute('dashboard');
      return { success: true, user: sandboxUser };
    }

    try {
      const response = await fetchSecure("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const sessionData = await response.json();
        // Retrieve full profile from /auth/me
        const meResponse = await fetchSecure("/auth/me");
        if (meResponse.ok) {
          const userData = await meResponse.json();
          const merged = { ...sandboxUser, ...userData, name: userData.name || userData.username || sandboxUser.name };
          setCurrentUser(merged);
          setAuthLoading(false);
          setCurrentRoute('dashboard');
          return { success: true, user: merged };
        }
      }
      setAuthLoading(false);
      return { success: false, error: "Invalid credentials or unauthorized request." };
    } catch (err) {
      setAuthLoading(false);
      console.error("Login API error", err);
      return { success: false, error: "API connection failed. Use Sandbox Mode to bypass." };
    }
  };

  // Secure Signup Trigger
  const signup = async (userData, isSandbox = false) => {
    setAuthLoading(true);
    if (isSandbox) {
      await new Promise(resolve => setTimeout(resolve, 800));
      const registeredUser = {
        ...sandboxUser,
        name: userData.name || sandboxUser.name,
        email: userData.email || sandboxUser.email,
        title: userData.title || 'CS Student & Builder',
        role: userData.role || 'Contributor'
      };
      localStorage.setItem('colabhub_sandbox_session', 'true');
      setCurrentUser(registeredUser);
      setAuthLoading(false);
      setCurrentRoute('dashboard');
      return { success: true, user: registeredUser };
    }

    try {
      const response = await fetchSecure("/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        setAuthLoading(false);
        return { success: true };
      }
      const errorJson = await response.json().catch(() => ({}));
      setAuthLoading(false);
      return { success: false, error: errorJson.message || "Registration failed. Try Sandbox Mode." };
    } catch (err) {
      setAuthLoading(false);
      console.error("Signup API error", err);
      return { success: false, error: "API connection failed. Use Sandbox Mode to bypass." };
    }
  };

  // Secure Logout Trigger
  const logout = async () => {
    setAuthLoading(true);
    if (localStorage.getItem('colabhub_sandbox_session') === 'true') {
      localStorage.removeItem('colabhub_sandbox_session');
    } else {
      try {
        await fetchSecure("/auth/logout", { method: "POST" });
      } catch (err) {
        console.warn("Logout API issue", err);
      }
    }
    setCurrentUser(null);
    setAuthLoading(false);
    setCurrentRoute('landing');
  };

  // Action: Request to join a team
  const requestToJoin = (teamId) => {
    setActiveTeams(prev => prev.map(team => {
      if (team.id === teamId) {
        const isRequesting = !team.requested;
        
        if (isRequesting) {
          setApplications(apps => [
            {
              id: `a-${Date.now()}`,
              project: team.name,
              role: team.rolesNeeded[0] || 'Contributor',
              status: 'Reviewing',
              timeline: 'Awaiting team response',
              progress: 25,
            },
            ...apps
          ]);
        } else {
          setApplications(apps => apps.filter(a => a.project !== team.name));
        }

        return { ...team, requested: isRequesting };
      }
      return team;
    }));
  };

  // Action: Accept Sarah Chen's request
  const handleNotificationAction = (notificationId, action) => {
    setNotifications(prev => prev.map(notif => {
      if (notif.id === notificationId) {
        return { ...notif, status: action === 'accept' ? 'accepted' : 'declined' };
      }
      return notif;
    }));
  };

  // Action: Create Project
  const createProjectPost = (projectData) => {
    const newTeam = {
      id: `t-${Date.now()}`,
      name: projectData.name,
      hackathon: projectData.hackathon || 'Open Project',
      posted: 'Just now',
      desc: projectData.description,
      avatars: [currentUser ? currentUser.avatar : sandboxUser.avatar],
      extraMembers: 0,
      rolesNeeded: projectData.roles || [],
      tags: [...projectData.roles.map(r => `${r}`), ...(projectData.skills || [])],
      requested: false,
    };

    setActiveTeams(prev => [newTeam, ...prev]);
    setProjectModalOpen(false);
    setCurrentRoute('explore');
  };

  // Admin Actions
  const addHackathon = (data) => {
    const newHack = {
      id: `h-${Date.now()}`,
      title: data.title,
      date: data.date || 'TBD',
      prize: data.prize || '$10k Prizes',
      status: 'Active Now',
      endsIn: data.endsIn || '7 days',
      iconBg: 'bg-blue-50 text-blue-600',
      prizeAmount: data.prize ? data.prize.replace(/[^0-9,kK]/g, '') : '10,000',
      prizeLabel: 'prize pool',
      description: data.description || 'Join this competition and build standard, high-potential products to win.',
      category: data.category || 'General Tech',
      colors: {
        primary: '#4d61ff',
        primaryHover: '#5e70ff',
        secondary: '#ff3e00',
        secondaryHover: '#ff6d43',
        accent: '#00e0b0'
      }
    };
    setHackathons(prev => [newHack, ...prev]);
  };

  const deleteTeamPost = (teamId) => {
    setActiveTeams(prev => prev.filter(team => team.id !== teamId));
  };

  const verifyUser = (userName) => {
    setPlatformUsers(prev => prev.map(user => {
      if (user.name === userName) {
        return { ...user, status: user.status === 'Verified' ? 'Suspended' : 'Verified' };
      }
      return user;
    }));
  };

  return (
    <AppContext.Provider value={{
      currentRoute,
      setCurrentRoute,
      projectModalOpen,
      setProjectModalOpen,
      currentUser,
      setCurrentUser,
      authLoading,
      setAuthLoading,
      globalSearchQuery,
      setGlobalSearchQuery,
      hackathons,
      notifications,
      applications,
      opportunities,
      activeTeams,
      requestToJoin,
      handleNotificationAction,
      createProjectPost,
      platformUsers,
      addHackathon,
      deleteTeamPost,
      verifyUser,
      fetchSecure,
      init,
      login,
      signup,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

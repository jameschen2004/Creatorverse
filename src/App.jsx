import { useEffect, useState } from 'react'
import { useRoutes, Link, useLocation } from 'react-router-dom'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import './App.css'
import { supabase } from './client'

function App() {
  const [creators, setCreators] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase.from("creators").select("*");
      if (!error) setCreators(data || []);
    };
    fetchCreators();
  }, [location])

  const handleDelete = (id) => {
    setCreators(prev => prev.filter(c => c.id !== id));
  };

  const routes = useRoutes([
    { path: "/", element: <ShowCreators creators={creators} onDelete={handleDelete} /> },
    { path: "/view/:id", element: <ViewCreator creators={creators} onDelete={handleDelete} /> },
    { path: "/edit/:id", element: <EditCreator creators={creators} onUpdate={setCreators} /> },
    { path: "/add", element: <AddCreator onAdd={setCreators} /> },
  ]);

  return (
    <div>
      <nav className="navbar">
        <Link to="/">Show All Creators</Link>
        <Link to="/add">Add Creator</Link>
      </nav>

      {routes}
    </div>
  );
}

export default App

import { Link } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const NavBar = () => {
  const [nav, setNav] = useState([
    {
      path: "/Reports",
      link: "Inicio",
    },
  ]);

  const removeUser = useUserStore((state) => state.removeUser);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.rol === 2525) {
      setNav([
        { path: "/Reports", link: "Inicio" },
        { path: "/checkin", link: "CheckIn" },
        { path: "/registers", link: "Registros" },
        { path: "/createuser", link: "Crear usuario" },
      ]);
    } else {
      setNav([{ path: "/Reports", link: "Inicio" }]);
    }
  }, [user?.rol]);

  const closeSession = () => {
    removeUser(); // 🔹 Limpia Zustand

    alert("Sesión cerrada.");
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm rounded-t-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          {user && (
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {nav.map((item, i) => (
                <li key={i}>
                  <Link to={item.path}>{item.link}</Link>
                </li>
              ))}
              {/* <li>
                <Link to="/Reports">Inicio</Link>
              </li>
              <li>
                <Link to="/checkin">CheckIn</Link>
              </li>
              <li>
                <Link to="/registers">Registros</Link>
              </li>
              <li>
                <Link to="/createuser">Crear usuario</Link>
              </li> */}
              {/* <li>
              <a>Parent</a>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </li> */}
            </ul>
          )}
        </div>
        <a className="btn btn-ghost text-xl">QR PASS</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        {user && (
          <ul className="menu menu-horizontal px-1">
            {nav.map((item, i) => (
              <li key={i}>
                <Link to={item.path}>{item.link}</Link>
              </li>
            ))}
            {/* <li>
              <Link to="/Reports">Inicio</Link>
            </li>
            <li>
              <Link to="/checkin">CheckIn</Link>
            </li>
            <li>
              <Link to="/registers">Registros</Link>
            </li>
            <li>
              <Link to="/createuser">Crear usuario</Link>
            </li> */}
            {/* <li>
              <details>
                <summary>Registros</summary>
                <ul className="p-2 z-50">
                  <li>
                    <Link to="/checkin">CheckIn</Link>
                  </li>
                  <li>
                    <Link to="/registers">Registros</Link>
                  </li>
                </ul>
              </details>
            </li> */}
          </ul>
        )}
      </div>
      {user && (
        <div className="navbar-end gap-2 dropdown dropdown-end dropdown-bottom">
          {/* <label tabIndex={0} className="btn bg-Primary text-Secondary m-1">
            {user.user_name}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </label> */}
          <label className="avatar avatar-placeholder">
            <div
              tabIndex={0}
              className="bg-Primary text-Secondary w-12 rounded-full cursor-pointer flex justify-center items-center select-none"
            >
              <span className="text-3xl">
                {user.user_name.charAt(0).toUpperCase()}
              </span>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-52 pt-8"
          >
            <span className="text-center pb-2">{user.user_name}</span>
            {/* <li>
              <Link to="/profile">Perfil</Link>
            </li> */}
            {/* <li>
              <Link to="/settings">Configuración</Link>
            </li> */}
            <li>
              <button onClick={closeSession}>Cerrar Sesión</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

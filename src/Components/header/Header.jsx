import { NavBar } from "./NavBar.jsx";
import valleinLogo from "../../assets/valleinlogo.png";

export const Header = () => {
  return (
    <div className="shadow-md pt-4 mb-8">
      <NavBar />
      <picture className="relative mx-auto mb-4">
        <img className="w-full" src={valleinLogo} alt="Logo Valle In" />
      </picture>
    </div>
  );
};

import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MenuIcon from "@mui/icons-material/Menu";

type HeaderProps = {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
  toggleMenu: () => void;
};

const Header: React.FC<HeaderProps> = ({
  currentDate,
  setCurrentDate,
  view,
  setView,
  toggleMenu,
}) => {
  return (
    <div className="flex justify-between items-center w-full h-10 bg-gray-800 px-4">
      <div className="flex items-center">
        <MenuIcon
          fontSize="small"
          className="mr-4 cursor-pointer"
          onClick={toggleMenu}
        />
        <div className="font-bold cursor-pointer">CC</div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="flex justify-center items-center mx-2 px-2 py-1 border border-gray-500 rounded">
          <button
            onClick={() => setCurrentDate(new Date())}
            className=" bg-gray-800 text-blue-600 text-xxs"
          >
            Today
          </button>
        </div>
        <ArrowBackIosIcon
          className="mx-2 cursor-pointer icon-extra-small"
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() - 1))
            )
          }
        />
        <div className="cursor-pointer font-medium mx-2 text-xs">
          {currentDate.toLocaleDateString("ja-JP", {
            year: "numeric",
            month: "long",
          })}
        </div>

        <ArrowForwardIosIcon
          className="mx-2 cursor-pointer icon-extra-small"
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() + 1))
            )
          }
        />
      </div>
      <div className="flex items-center justify-end text-xs">
        <SearchIcon fontSize="small" className="mr-4 cursor-pointer" />
        <select
          value={view}
          onChange={(e) => setView(e.target.value)}
          className="mr-4 text-xxs text-white cursor-pointer bg-gray-800 border border-gray-500 rounded px-2 py-1 outline-none"
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
        <div className="cursor-pointer border border-gray-500 rounded-full px-2 py-1">
          R
        </div>
      </div>
    </div>
  );
};

export default Header;

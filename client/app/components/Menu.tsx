import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

type MenuProps = {
  menuOpen: boolean;
  toggleMenu: () => void;
  openModal: () => void;
  friendListOpen: boolean;
  toggleFriendList: () => void;
  menuRef: React.RefObject<HTMLDivElement>;
};

const Menu: React.FC<MenuProps> = ({
  menuOpen,
  toggleMenu,
  openModal,
  friendListOpen,
  toggleFriendList,
  menuRef,
}) => {
  return (
    <div
      ref={menuRef}
      className={`fixed top-0 left-0 w-56 h-full bg-gray-800 text-white transform ${
        menuOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="flex items-center p-2">
        <CloseIcon
          fontSize="small"
          className="mr-4 cursor-pointer"
          onClick={toggleMenu}
        />
        <div className="font-bold cursor-pointer">CC</div>
      </div>
      <button
        className="flex items-center ml-1 p-1 text-xxs bg-gray-700 border rounded-full"
        onClick={openModal}
      >
        <AddIcon className="icon-extra-small" />
        イベント作成
      </button>
      <div>
        <div
          className="flex items-center px-2 pt-2 cursor-pointer"
          onClick={toggleFriendList}
        >
          <div className="text-xxs mr-2">友達リスト</div>
          {friendListOpen ? (
            <ArrowDropUpIcon
              onClick={toggleFriendList}
              fontSize="small"
              className="cursor-pointer"
            />
          ) : (
            <ArrowDropDownIcon
              onClick={toggleFriendList}
              fontSize="small"
              className="cursor-pointer"
            />
          )}
        </div>
        {friendListOpen && (
          <div className="px-2">
            <div className="flex items-center p-1">
              <input
                type="text"
                className="flex-grow p-1 bg-gray-700 rounded-sm text-xxs h-4"
                placeholder="名前を検索"
              />
            </div>
            <label className="flex items-center p-1 w-full cursor-pointer">
              <div className="text-xxs w-6 h-6 flex items-center justify-center border border-gray-500 rounded-full mr-2">
                T
              </div>
              <div className="text-xxs">タナカ</div>
            </label>
            <label className="flex items-center p-1 w-full cursor-pointer">
              <div className="cursor-pointer text-xxs w-6 h-6 flex items-center justify-center border border-gray-500 rounded-full mr-2">
                M
              </div>
              <div className="text-xxs">マイケル</div>
            </label>
            <label className="flex items-center p-1 w-full cursor-pointer">
              <div className="cursor-pointer text-xxs w-6 h-6 flex items-center justify-center border border-gray-500 rounded-full mr-2">
                J
              </div>
              <div className="text-xxs">ジョン</div>
            </label>
            <label className="flex items-center p-1 w-full cursor-pointer">
              <div className="cursor-pointer text-xxs w-6 h-6 flex items-center justify-center border border-gray-500 rounded-full mr-2">
                N
              </div>
              <div className="text-xxs">ニーナ</div>
            </label>
          </div>
        )}
      </div>

      <label className="flex items-center p-2 cursor-pointer">
        <AddIcon className="icon-extra-small" />
        <div className="text-xxxs">友達を追加</div>
      </label>
      <div className="flex items-center p-2 absolute bottom-0 w-full">
        <div className="cursor-pointer text-xxs w-auto border border-gray-500 rounded-full mr-1 px-2 py-1">
          R
        </div>
        <div className="text-xxs">リョウタ</div>
      </div>
    </div>
  );
};

export default Menu;

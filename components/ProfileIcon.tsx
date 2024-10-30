import Image from "next/image";
import { useState } from "react";

const Profile: React.FC = () => {
  const [isDrop, setDrop] = useState(false);
  const dropItems = [
    { option: "Profile", route: "/profile" },
    { option: "Log out", route: "" },
  ];
  return (
    <>
      {/* Dropdown for profile actions */}
      <div className="dropdown dropdown-end">
        {/* Profile Icon */}
        <Image
          src="/panda.png"
          alt="User Profile"
          width={48}
          height={48}
          className="cursor-pointer rounded-full"
          tabIndex={0}
          role="button"
          onClick={() => setDrop(!isDrop)}
        />
        {isDrop && (
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] mt-4 w-52 rounded-box bg-secondary p-2 shadow"
          >
            {dropItems.map((item, index) => {
              return (
                <li key={index}>
                  <a href={item.route}>{item.option}</a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default Profile;

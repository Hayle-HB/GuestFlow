import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaComments,
  FaBell,
  FaChartLine,
  FaUsers,
  FaCog,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
  FaUserCircle,
  FaChartBar,
  FaChartPie,
  FaHistory,
} from "react-icons/fa";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "dashboard",
      icon: <FaHome className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      key: "feedback",
      icon: <FaComments className="w-5 h-5" />,
      label: "Smart Feedback",
      children: [
        {
          key: "real-time-feedback",
          label: "Real-Time Analysis",
          icon: <FaChartBar className="w-4 h-4" />,
        },
        {
          key: "sentiment-analysis",
          label: "Sentiment Analysis",
          icon: <FaChartPie className="w-4 h-4" />,
        },
        {
          key: "response-tracking",
          label: "Response Tracking",
          icon: <FaHistory className="w-4 h-4" />,
        },
      ],
    },
    {
      key: "alerts",
      icon: <FaBell className="w-5 h-5" />,
      label: "Priority Alerts",
    },
    {
      key: "analytics",
      icon: <FaChartLine className="w-5 h-5" />,
      label: "Feedback Analytics",
    },
    {
      key: "team",
      icon: <FaUsers className="w-5 h-5" />,
      label: "Response Team",
    },
    {
      key: "settings",
      icon: <FaCog className="w-5 h-5" />,
      label: "Settings",
    },
  ];

  const handleMenuClick = (key) => {
    setActiveMenu(key);
    navigate(`/admin/${key}`);
  };

  return (
    <div
      className={`bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] h-screen flex flex-col transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } shadow-2xl relative border-r border-[#3a3a3a]`}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-[#3a3a3a] bg-gradient-to-r from-[#2d2d2d] to-[#1a1a1a]">
        <div className="flex items-center justify-center">
          {collapsed ? (
            <span className="text-2xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent filter drop-shadow-lg">
              KT
            </span>
          ) : (
            <span className="text-xl font-semibold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent uppercase tracking-wider filter drop-shadow-lg">
              Kuriftu Twin
            </span>
          )}
        </div>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-[#3a3a3a] bg-gradient-to-r from-[#2d2d2d] to-[#1a1a1a]">
        <div className="flex items-center space-x-3">
          <div className="relative group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center text-white shadow-lg transform transition-transform duration-200 group-hover:scale-105">
              <FaUserCircle className="w-6 h-6" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#2d2d2d] shadow-sm"></div>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-200">
                Admin User
              </span>
              <span className="text-xs text-[#FFD700] font-medium">
                Super Admin
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4 px-2">
        {menuItems.map((item) => (
          <div key={item.key}>
            <div
              className={`flex items-center px-4 py-2.5 mx-2 rounded-lg cursor-pointer transition-all duration-200 ${
                activeMenu === item.key
                  ? "bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 text-[#FFD700] shadow-lg"
                  : "text-gray-400 hover:bg-gradient-to-r hover:from-[#FFD700]/10 hover:to-[#FFA500]/10 hover:text-[#FFD700] hover:shadow-md"
              }`}
              onClick={() => handleMenuClick(item.key)}
            >
              <div className="flex items-center">
                <div
                  className={`${
                    activeMenu === item.key
                      ? "text-[#FFD700]"
                      : "text-gray-400 group-hover:text-[#FFD700]"
                  } transform transition-transform duration-200 group-hover:scale-110`}
                >
                  {item.icon}
                </div>
                {!collapsed && (
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                )}
              </div>
            </div>
            {item.children && !collapsed && (
              <div className="ml-4 mt-1 space-y-1">
                {item.children.map((child) => (
                  <div
                    key={child.key}
                    className={`flex items-center px-3 py-2 text-sm rounded-lg cursor-pointer transition-all duration-200 ${
                      activeMenu === child.key
                        ? "bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 text-[#FFD700] shadow-md"
                        : "text-gray-400 hover:bg-gradient-to-r hover:from-[#FFD700]/10 hover:to-[#FFA500]/10 hover:text-[#FFD700] hover:shadow-sm"
                    }`}
                    onClick={() => handleMenuClick(child.key)}
                  >
                    <div className="mr-2">{child.icon}</div>
                    {child.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-[#3a3a3a] bg-gradient-to-r from-[#2d2d2d] to-[#1a1a1a]">
        <div className="space-y-3">
          {/* Notifications */}
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative">
              <div className="w-8 h-8 flex items-center justify-center text-gray-400 group-hover:text-[#FFD700] transition-all duration-200 transform group-hover:scale-110">
                <FaBell className="w-5 h-5" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs shadow-sm transform transition-transform duration-200 group-hover:scale-110">
                5
              </div>
            </div>
            {!collapsed && (
              <span className="text-sm text-gray-400 group-hover:text-[#FFD700] font-medium">
                Notifications
              </span>
            )}
          </div>

          {/* Logout */}
          <div className="flex items-center space-x-3 cursor-pointer group">
            <div className="w-8 h-8 flex items-center justify-center text-gray-400 group-hover:text-[#FFD700] transition-all duration-200 transform group-hover:scale-110">
              <FaSignOutAlt className="w-5 h-5" />
            </div>
            {!collapsed && (
              <span className="text-sm text-gray-400 group-hover:text-[#FFD700] font-medium">
                Logout
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-12 bg-[#2d2d2d] rounded-r-lg shadow-xl flex items-center justify-center text-gray-400 hover:text-[#FFD700] transition-all duration-200 border border-l-0 border-[#3a3a3a] hover:shadow-2xl hover:scale-105"
      >
        {collapsed ? (
          <FaChevronRight className="w-4 h-4" />
        ) : (
          <FaChevronLeft className="w-4 h-4" />
        )}
      </button>
    </div>
  );
};

export default SideBar;

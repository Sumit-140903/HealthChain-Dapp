import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useDisconnect } from "wagmi";
import {
  FiMenu,
  FiBell,
  FiUser,
  FiSettings,
  FiLogOut,
  FiHeart,
  FiActivity,
  FiShield,
  FiWifi,
  FiClock,
} from "react-icons/fi";
import {
  MdLocalHospital,
  MdAdminPanelSettings,
  MdHealthAndSafety,
  MdNotifications,
  MdMedicalServices,
  MdEmergency,
  MdVerifiedUser,
  MdMonitorHeart,
  MdLocalPharmacy,
  MdBiotech,
  MdSecurityUpdate,
} from "react-icons/md";
import {
  FaStethoscope,
  FaUserMd,
  FaHospitalUser,
  FaHeartbeat,
  FaPrescriptionBottleAlt,
  FaAmbulance,
  FaNotesMedical,
  FaSyringe,
} from "react-icons/fa";
import { useHealthcareContract } from "../../hooks/useContract";
import { formatTime } from "../../utils/helpers";
import CustomConnectButton from "../layout/CustomConnectButton";

const Header = ({ onMenuClick, userType }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifHighlight, setNotifHighlight] = useState(false);
  const prevNotifCountRef = useRef(null);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const { getNotifications } = useHealthcareContract();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (isConnected && address) {
        try {
          const userNotifications = await getNotifications(address);
          setNotifications(userNotifications.slice(-5)); // Get latest 5 notifications
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [isConnected, address, getNotifications]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (prevNotifCountRef.current === null) {
      prevNotifCountRef.current = notifications.length;
      return;
    }
    if (notifications.length > prevNotifCountRef.current) {
      setNotifHighlight(true);
      const t = setTimeout(() => setNotifHighlight(false), 4000);
      prevNotifCountRef.current = notifications.length;
      return () => clearTimeout(t);
    }
    prevNotifCountRef.current = notifications.length;
  }, [notifications.length]);

  const getUserRole = () => {
    if (!userType) return "Guest";
    return userType.userType || "User";
  };

  const getRoleIcon = () => {
    const role = getUserRole();
    switch (role.toLowerCase()) {
      case "admin":
        return <MdAdminPanelSettings className="w-5 h-5" />;
      case "doctor":
        return <FaUserMd className="w-5 h-5" />;
      case "patient":
        return <FaHospitalUser className="w-5 h-5" />;
      default:
        return <FiUser className="w-5 h-5" />;
    }
  };

  const getRoleBadgeColor = () => {
    const role = getUserRole();
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-red-200";
      case "doctor":
        return "bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 border-teal-200";
      case "patient":
        return "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200";
      default:
        return "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200";
    }
  };

  const getNotificationIcon = (categoryType) => {
    switch (categoryType) {
      case "Medicine":
        return <FaPrescriptionBottleAlt className="w-4 h-4" />;
      case "Doctor":
        return <FaUserMd className="w-4 h-4" />;
      case "Patient":
        return <FaHospitalUser className="w-4 h-4" />;
      case "Appointment":
        return <FaStethoscope className="w-4 h-4" />;
      case "Emergency":
        return <MdEmergency className="w-4 h-4" />;
      default:
        return <MdNotifications className="w-4 h-4" />;
    }
  };

  const getNotificationColor = (categoryType) => {
    switch (categoryType) {
      case "Medicine":
        return "bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-emerald-200";
      case "Doctor":
        return "bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 border-teal-200";
      case "Patient":
        return "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200";
      case "Appointment":
        return "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200";
      case "Emergency":
        return "bg-gradient-to-r from-red-100 to-orange-100 text-red-800 border-red-200";
      default:
        return "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <header className="bg-gradient-to-r from-white via-emerald-25 to-teal-25 shadow-lg border-b border-emerald-200 sticky top-0 z-30 backdrop-blur-md">
      {/* Medical header accent */}
      <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section - Enhanced */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-3 rounded-xl text-gray-500 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 lg:hidden transition-all duration-200 transform hover:scale-105"
            >
              <FiMenu className="h-6 w-6" />
            </button>

            {/* Enhanced Logo */}
            <div className="flex items-center ml-4 lg:ml-0">
              <div className="flex items-center space-x-3">
                <div className="relative p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl shadow-lg">
                  <MdLocalHospital className="h-7 w-7 text-white" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-300 rounded-full border-2 border-white">
                    <FaHeartbeat className="h-2 w-2 text-emerald-600 m-0.5 animate-pulse" />
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    HealthChain
                    <MdBiotech className="h-5 w-5 text-emerald-600" />
                  </h1>
                  <p className="text-xs text-gray-600 flex items-center gap-1">
                    <MdSecurityUpdate className="h-3 w-3" />
                    Decentralized Healthcare Platform
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Center section - Time & Status */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
              <FiClock className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-gray-700">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>

            {isConnected && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <MdHealthAndSafety className="h-4 w-4 text-teal-600" />
                <span className="text-sm font-medium text-gray-700">
                  Secure
                </span>
              </div>
            )}
          </div>

          {/* Right section - Enhanced */}
          <div className="flex items-center space-x-3">
            {/* Enhanced User Role Badge */}
            {isConnected && userType && (
              <div
                className={`px-4 py-2 rounded-xl text-sm font-semibold border-2 flex items-center space-x-2 shadow-sm transition-all duration-200 hover:shadow-md ${getRoleBadgeColor()}`}
              >
                <div className="p-1 bg-white bg-opacity-70 rounded-lg">
                  {getRoleIcon()}
                </div>
                <span>{getUserRole()}</span>
                <MdVerifiedUser className="w-4 h-4" />
              </div>
            )}

            {/* Enhanced Notifications */}
            {isConnected && (
              <div className="relative">
                <button
                  onClick={() => { const next = !showNotifications; setShowNotifications(next); if (next) setNotifHighlight(false); }}
                  className="relative p-3 text-gray-500 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105"
                >
                  <MdNotifications className="h-6 w-6" />
                  {notifications.length > 0 && (
                    <div className="absolute -top-1 -right-1">
                      <div className="relative">
                        <span className={`flex h-5 w-5 items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full font-bold ${notifHighlight ? "animate-pulse" : ""}`}>
                          {notifications.length}
                        </span>
                        {notifHighlight && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        )}
                      </div>
                    </div>
                  )}
                </button>

                {/* Enhanced Notifications dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl border border-emerald-200 z-50 backdrop-blur-lg">
                    <div className="p-6 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-t-2xl">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                          <MdNotifications className="h-5 w-5 text-emerald-600" />
                          Medical Notifications
                        </h3>
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <FaHeartbeat className="h-4 w-4 text-emerald-600 animate-pulse" />
                        </div>
                      </div>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                          <div
                            key={index}
                            className="p-4 border-b border-gray-100 hover:bg-gradient-to-r hover:from-emerald-25 hover:to-teal-25 transition-all duration-200"
                          >
                            <div className="flex items-start space-x-3">
                              <div className="p-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg">
                                {getNotificationIcon(notification.categoryType)}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">
                                  {notification.message}
                                </p>
                                <div className="flex items-center justify-between mt-3">
                                  <span
                                    className={`text-xs px-3 py-1 rounded-full border font-medium flex items-center gap-1 ${getNotificationColor(
                                      notification.categoryType
                                    )}`}
                                  >
                                    {getNotificationIcon(
                                      notification.categoryType
                                    )}
                                    {notification.categoryType}
                                  </span>
                                  <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <FiClock className="h-3 w-3" />
                                    {formatTime(notification.timestamp)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <div className="p-4 bg-gradient-to-r from-gray-100 to-slate-100 rounded-xl mb-4 w-fit mx-auto">
                            <MdNotifications className="h-8 w-8 text-gray-400" />
                          </div>
                          <p className="text-gray-500 font-medium">
                            No notifications yet
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Medical updates will appear here
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Enhanced Profile dropdown */}
            {isConnected && (
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="relative p-3 text-gray-500 hover:text-emerald-600 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105"
                >
                  <div className="relative">
                    <FiUser className="h-6 w-6" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border border-white animate-pulse"></div>
                  </div>
                </button>

                {/* Enhanced Profile dropdown */}
                {showProfile && (
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-emerald-200 z-50 backdrop-blur-lg">
                    <div className="p-6 border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-t-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                          {getRoleIcon()}
                          <div className="text-white"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-gray-900">
                            {userType?.name || "User"}
                          </p>
                          <p className="text-xs text-gray-600 flex items-center gap-1">
                            <MdHealthAndSafety className="h-3 w-3" />
                            {getUserRole()} Account
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 p-2 bg-white bg-opacity-70 rounded-lg">
                        <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                          <FiWifi className="h-3 w-3" />
                          {address}
                        </p>
                      </div>
                    </div>
                    <div className="py-2">
                      <button className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-emerald-25 hover:to-teal-25 flex items-center space-x-3 transition-all duration-200">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <FiUser className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span>Medical Profile</span>
                      </button>
                      <button className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gradient-to-r hover:from-teal-25 hover:to-cyan-25 flex items-center space-x-3 transition-all duration-200">
                        <div className="p-2 bg-teal-100 rounded-lg">
                          <FiSettings className="w-4 h-4 text-teal-600" />
                        </div>
                        <span>Healthcare Settings</span>
                      </button>
                      <div className="border-t border-emerald-100 mt-2 pt-2">
                        <button onClick={() => { setShowProfile(false); try { disconnect(); } catch (e) {} router.push("/"); }} className="w-full px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-gradient-to-r hover:from-red-25 hover:to-pink-25 flex items-center space-x-3 transition-all duration-200">
                          <div className="p-2 bg-red-100 rounded-lg">
                            <FiLogOut className="w-4 h-4 text-red-600" />
                          </div>
                          <span>Sign out</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Enhanced Wallet Connect Button */}
            <div className="ml-2">
              <div className="relative">
                <CustomConnectButton />
                {isConnected && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse border border-white"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Close dropdowns when clicking outside */}
      {(showNotifications || showProfile) && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-20 backdrop-blur-sm"
          onClick={() => {
            setShowNotifications(false);
            setShowProfile(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;

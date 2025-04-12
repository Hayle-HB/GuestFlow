import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ChevronRight,
  Plus,
} from "lucide-react";

const Itinerary = () => {
  const activities = [
    {
      id: 1,
      title: "Spa Day",
      date: "2024-03-15",
      time: "10:00 AM",
      location: "Spa Center",
      participants: 2,
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Dinner Reservation",
      date: "2024-03-15",
      time: "7:00 PM",
      location: "Main Restaurant",
      participants: 2,
      status: "Upcoming",
    },
    {
      id: 3,
      title: "City Tour",
      date: "2024-03-16",
      time: "9:00 AM",
      location: "Hotel Lobby",
      participants: 2,
      status: "Upcoming",
    },
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            My Itinerary
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your activities and reservations
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
              All Activities
            </button>
            <button className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
              Upcoming
            </button>
            <button className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
              Past
            </button>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
            <Plus className="h-5 w-5" />
            <span>Add Activity</span>
          </button>
        </div>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                    {activity.title}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {activity.date}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {activity.time}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {activity.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {activity.participants} people
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      activity.status === "Upcoming"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {activity.status}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;

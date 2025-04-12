import React from "react";
import { Star, Gift, CreditCard, ChevronRight, Crown } from "lucide-react";

const Loyalty = () => {
  const benefits = [
    {
      icon: Gift,
      title: "Exclusive Discounts",
      description:
        "Enjoy special rates and offers available only to loyalty members",
    },
    {
      icon: Star,
      title: "Priority Service",
      description: "Get priority access to reservations and services",
    },
    {
      icon: CreditCard,
      title: "Points Rewards",
      description: "Earn points on every stay that can be redeemed for rewards",
    },
  ];

  const rewards = [
    {
      id: 1,
      title: "Free Night Stay",
      points: 5000,
      description: "Redeem for a complimentary night at any of our properties",
    },
    {
      id: 2,
      title: "Spa Package",
      points: 3000,
      description: "Enjoy a full day spa experience for two",
    },
    {
      id: 3,
      title: "Dining Credit",
      points: 1000,
      description: "$100 credit to use at any of our restaurants",
    },
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Crown className="h-8 w-8 text-amber-600" />
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Loyalty Program
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Your journey to exclusive benefits starts here
          </p>
        </div>

        {/* Membership Status */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-800 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-medium text-white mb-2">
                Gold Member
              </h2>
              <p className="text-amber-100">You have 2,500 points</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-32 h-2 bg-amber-200/30 rounded-full">
                <div className="w-3/4 h-full bg-white rounded-full" />
              </div>
              <span className="text-white">75%</span>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                    <Icon className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Available Rewards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Available Rewards
          </h2>
          <div className="space-y-4">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-1">
                      {reward.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {reward.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-amber-500" />
                      <span className="text-gray-800 dark:text-white">
                        {reward.points}
                      </span>
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
                      <span>Redeem</span>
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Recent Activity
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-800 dark:text-white">
                    Points earned from stay
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    March 10, 2024
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  <span className="text-green-600 dark:text-green-400">
                    +500
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-800 dark:text-white">
                    Reward redeemed
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    March 5, 2024
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  <span className="text-red-600 dark:text-red-400">-1000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loyalty;

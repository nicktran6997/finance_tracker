import React from 'react';
import { navigation, userNavigation, classNames } from './util';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const MobileNav = () => {
  return (
    <div className="md:hidden" id="mobile-menu">
      <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
        {navigation.map((item: any) => (
          <a
            key={item.name}
            href={item.href}
            className={classNames(
              item.current
                ? 'bg-blue-900 text-white'
                : 'text-blue-300 hover:bg-blue-700 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium'
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            {item.name}
          </a>
        ))}
      </div>
      <div className="border-t border-blue-700 pb-3 pt-4">
        <div className="flex items-center px-5">
          <div className="flex-shrink-0">
            <UserCircleIcon className="h-10 w-10 text-blue-300" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium leading-none text-white">Tom Cook</div>
            <div className="text-sm font-medium leading-none text-blue-300">tom@example.com</div>
          </div>
          <button
            type="button"
            className="ml-auto flex-shrink-0 rounded-full bg-blue-800 p-1 text-blue-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800"
          >
            <span className="sr-only">View notifications</span>
            <BellIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-3 space-y-1 px-2">
          {userNavigation.map((item: any) => (
            <a
              key={item.name}
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-blue-300 hover:bg-blue-700 hover:text-white"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
export const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Transactions', href: '#', current: false },
  { name: 'Reports', href: '#', current: false },
];

export const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}